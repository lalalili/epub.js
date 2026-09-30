import {afterEach, describe, expect, it} from 'vitest';
import {captureSemanticCut, resolveSemanticCut, semanticDigest} from '../../src/rendering/semantic-cut';

let host;
afterEach(() => { host?.remove(); });
async function fixture() {
  host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:0;top:0;width:113px;height:80px;overflow:hidden';
  const frame = document.createElement('iframe');
  frame.style.cssText = 'position:relative;left:-43px;width:400px;height:80px;border:0';
  const loaded = new Promise(resolve => frame.onload = resolve);
  frame.srcdoc = '<html><body style="margin:0;white-space:nowrap;font:20px monospace">' +
    [...'abcdefghijklmnop'].map(c => '<span style="display:inline-block;width:20px">' + c + '</span>').join('') +
    '</body></html>';
  host.append(frame);
  document.body.append(host);
  await loaded;
  return {frame, doc: frame.contentDocument};
}

describe('bounded semantic cut', () => {
  it('matches independent WebCrypto SHA-256 including unicode and padding boundaries', async () => {
    for (const value of ['', 'abc', '中文😀', ...[55,56,64,12000].map(n => 'x'.repeat(n))]) {
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
      expect(semanticDigest(value)).toBe([...new Uint8Array(digest)].map(x => x.toString(16).padStart(2,'0')).join(''));
    }
  });
  it('resolves and recaptures the same visible content without a saved pixel offset', async () => {
    const {frame,doc} = await fixture();
    const cut = captureSemanticCut(doc,frame,'/6/2');
    expect(cut).not.toBeNull();
    frame.style.left = '-183px';
    const result = resolveSemanticCut(doc,frame,cut,287,'/6/2');
    expect(result.status).toBe('qualified');
    frame.style.left = '-' + result.physicalStart + 'px';
    expect(captureSemanticCut(doc,frame,'/6/2')).toEqual(cut);
  });
  it('restores a translated cut with its effective left inset and source-proven masks', async () => {
    const {frame, doc} = await fixture();
    host.dataset.epubVrlEdgeMaskLeft = '25';
    host.dataset.epubVrlEdgeMaskRight = '0';
    const cut = captureSemanticCut(doc, frame, '/6/2');
    frame.style.left = '-183px';
    const result = resolveSemanticCut(doc, frame, cut, 287, '/6/2');
    expect(result.status).toBe('qualified');
    frame.style.left = '-' + result.physicalStart + 'px';
    expect(captureSemanticCut(doc, frame, '/6/2')).toEqual(cut);
    host.dataset.epubVrlEdgeMaskLeft = '12';
    host.dataset.epubVrlEdgeMaskRight = '13';
    host.dataset.epubVrlEdgeMaskLeft = String(result.maskWidths.left);
    host.dataset.epubVrlEdgeMaskRight = String(result.maskWidths.right);
    expect(captureSemanticCut(doc, frame, '/6/2')).toEqual(cut);
  });
  it('captures the applied product mask rather than hidden neighboring content', async () => {
    const {frame, doc} = await fixture();
    const unmasked = captureSemanticCut(doc, frame, '/6/2');
    host.dataset.epubVrlEdgeMaskLeft = '0';
    host.dataset.epubVrlEdgeMaskRight = '60';
    const masked = captureSemanticCut(doc, frame, '/6/2');
    const {default: EpubCFI} = await import('../../src/epubcfi');
    const text = cut => cut.runs.map(cfi => new EpubCFI(cfi).toRange(doc).toString()).join('');
    expect(text(unmasked)).toBe('cdefgh');
    expect(text(masked)).toBe('cde');
    host.dataset.epubVrlEdgeMaskRight = '0';
    expect(captureSemanticCut(doc, frame, '/6/2')).toEqual(unmasked);
  });
  it('reconstructs a terminal mask from the source cut after the painted mask is lost', async () => {
    const {frame, doc} = await fixture();
    frame.style.left = '0px';
    host.dataset.epubVrlEdgeMaskRight = '60';
    const cut = captureSemanticCut(doc, frame, '/6/2');
    host.dataset.epubVrlEdgeMaskRight = '0';
    const result = resolveSemanticCut(doc, frame, cut, 287, '/6/2', {allowCurrentTerminalMask: true});
    expect(result.status).toBe('qualified');
    expect(result.physicalStart).toBe(0);
    expect(result.maskWidths.left).toBe(0);
    const wanted = doc.createRange();
    wanted.selectNodeContents(doc.body.children[2]);
    const excluded = doc.createRange();
    excluded.selectNodeContents(doc.body.children[3]);
    const restoredRight = host.clientWidth - result.maskWidths.right;
    expect(restoredRight).toBeGreaterThanOrEqual(wanted.getBoundingClientRect().right);
    expect(restoredRight).toBeLessThanOrEqual(excluded.getBoundingClientRect().left);
    host.dataset.epubVrlEdgeMaskRight = String(result.maskWidths.right);
    expect(captureSemanticCut(doc, frame, '/6/2')).toEqual(cut);
  });
  it('rejects changed source, wrong spine, malformed cuts and stale documents', async () => {
    const {frame,doc} = await fixture();
    const cut = captureSemanticCut(doc,frame,'/6/2');
    expect(resolveSemanticCut(doc,frame,{...cut,version:2},287,'/6/2').status).toBe('unavailable');
    expect(resolveSemanticCut(doc,frame,cut,287,'/6/4').status).toBe('unavailable');
    expect(resolveSemanticCut(document,frame,cut,287,'/6/2').status).toBe('unavailable');
    doc.body.lastChild.textContent = 'changed';
    expect(resolveSemanticCut(doc,frame,cut,287,'/6/2').reason).toBe('semantic-source-mismatch');
  });
});
