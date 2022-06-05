abstract class Game {
  abstract setting(): Promise<void>
  abstract play(): Promise<void>
  abstract end(): void
}
