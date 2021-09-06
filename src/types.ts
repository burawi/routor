interface Controller {
  (params: object): void
}

interface BeforeOpen {
  (): void
}

export interface rawHandler {
  controller: Controller,
  beforeOpen?: BeforeOpen,
  template: string
}

export interface Handler extends rawHandler {
  path: any,
}

export interface RouterOptions {
  beforeOpen?: BeforeOpen,
  notFoundTemplate: string
}
