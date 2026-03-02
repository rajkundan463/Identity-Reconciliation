export interface Contact {

  primaryContatctId: number

  emails: string[]

  phoneNumbers: string[]

  secondaryContactIds: number[]
}


export interface GraphNode {

  id: string
  type: "primary" | "secondary"
}


export interface GraphEdge {

  source: string
  target: string
}


export interface Graph {

  nodes: GraphNode[]
  edges: GraphEdge[]
}


export interface IdentifyResponse {

  contact: Contact
  graph: Graph
}