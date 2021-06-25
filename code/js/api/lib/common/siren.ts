export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE'

export class SirenLink {
    rel: string[]
    href: string

    constructor(rel: string[], href: string){
        this.rel = rel
        this.href = href
    }
}

 export class Field {
  name: string
  type: string

  constructor(name: string, type: string){
    this.name = name
    this.type= type
  }
}

/**
 * Describes actions that are included in a Siren entity.
 */
 export class SirenAction {
  name: string
  title: string
  method: HttpMethod
  href: string
  type: string
  fields?: Field[]
  constructor(name: string, title: string, method: HttpMethod, href: string, fields?: Field[]){
    this.name = name
    this.title = title
    this.method = method
    this.href = href
    this.type = 'application/vnd.siren+json'
    this.fields = fields
  }
}

export class EmbeddedEntity {
  rel: string[]
  links: SirenLink[]
  properties?: any
  class?: string[]
  actions?: SirenAction[]
  title?: string
    constructor(rel: string[], links: SirenLink[], properties?: any, classes?: string[], actions?: SirenAction[], title?: string ){
        this.rel = rel
        this.properties = properties
        this.links = links
        this.class = classes
        this. actions = actions
        this. title = title
    }
}

/**
 * Describes Siren entities.
 */
export class Entity {
    title: string
  class: string[]
  properties?: any
  entities?: EmbeddedEntity[]
  links: SirenLink[]
  actions?: SirenAction[]
  

  constructor(title: string, classes: string[], links: SirenLink[], properties?: any,  actions?: SirenAction[], entities?: EmbeddedEntity[] ) {
    this.title = title    
    this.class = classes
        this.actions = actions
        this.entities = entities
        this.links = links
        this.properties = properties
        
    }
}

export const selfLink = (uri) => new SirenLink(['self'], uri)

export const BASENAME = '/queuality/api'