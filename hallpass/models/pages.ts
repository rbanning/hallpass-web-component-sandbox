import { html } from "lit"

export type PageContent = {
  heading: unknown
}
export type PageRepo = {
  [key: string]: PageContent
}

const DefaultPage: PageContent = {
  heading: html`
    <h1>Default Page</h1>
  `
}

const WelcomePage: PageContent = {
  heading: html`
    <h1>Welcome Page</h1>
  `
}

const AboutPage: PageContent = {
  heading: html`
    <h1>About Page</h1>
  `
}


export const pageRepo: PageRepo = {
  welcome: WelcomePage,
  about: AboutPage,

  default: DefaultPage
};
