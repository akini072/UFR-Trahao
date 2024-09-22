import { CpfMaskPipe } from './cpf-mask.pipe';

describe('CpfMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new CpfMaskPipe();
    expect(pipe).toBeTruthy();
  });
});
