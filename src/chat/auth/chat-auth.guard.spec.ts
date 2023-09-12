import { ChatJwtAuthGuard } from "./jwt-auth.guard";


describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new ChatJwtAuthGuard()).toBeDefined();
  });
});
