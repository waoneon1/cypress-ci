export interface CredentialInterface {
  token: string
  setToken: (value: string) => void
  getToken: (payload: string) => Promise<void>
}