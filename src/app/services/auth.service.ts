import { Injectable } from '@angular/core'
import { Store } from './store.service'
import { UserInfo } from '../models'

const { db, decode } = Store

@Injectable({
  providedIn: 'root'
})
export default class {
  auth(): boolean {
    if (!db.get('decToken').value()) return false

    const expTime = db.get('decToken.exp').value()

    if (expTime <= Math.floor(Date.now() / 1000)) {
      return false
    } else {
      return true
    }
  }

  getUser(): UserInfo {
    const { id, email, avatar } = db.get('decToken').value()

    return { id, email, avatar }
  }
  getRawToken(): string {
    return db.get('rawToken').value()
  }
  setToken(token: string): void {
    db.set('rawToken', token).write()
    const decToken = decode(token)
    db.set('decToken', decToken).write()
  }
  removeToken() {
    db.setState({}).write()
  }
}
