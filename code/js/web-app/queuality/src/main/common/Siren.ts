export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'TRACE'
export type MediaType = 'application/vnd.siren+json'

export type Link = {
    rel: string[], 
    href: string
}

export type Field = {
    name: string
    type: string
}

export type Action = {
    name: string,
    title?: string,       
    method?: HttpMethod,
    href: string, 
    type?: MediaType,
    fields?: Field[]
}

export type EmbeddedEntity<T> = {
    rel: string[],
    properties?: T,
    links: Link[],
    class: string[],
    actions: Action[],
    title: string
}

export type Entity<T, K> = {
    title: string,
    class: string[],
    properties: T,
    links: Link[],
    entities: EmbeddedEntity<K>[],
    actions: Action[]
}