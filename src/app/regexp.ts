export class Regexp{
  static emailRegexp = new RegExp('^(\\w*\\.?){1,3}[^\\.]*@\\w{1,5}(.com|.co|.org|.us|.net)$');
  static passwordRegexp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$%.&!])[A-Za-z\\d$%.&!]{8,}$')
  static userNameRegexp = new RegExp('^([A-Z][a-z]*) ([A-Z][a-z]*)$|^([a-z]*)([A-Z]{1})([a-z]*)$|^([a-z]+)-([a-z]+)$')

  static matchingEmail(email: string): any{
    return email.match(Regexp.emailRegexp);
  }

  static matchingPassword(password: string): RegExpMatchArray | null {
    return password.match(Regexp.passwordRegexp);
  }

  static matchingName(name: string): RegExpMatchArray | null {
    return name.match(Regexp.userNameRegexp);
  }
}
