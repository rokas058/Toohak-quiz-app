/**
 * Don't use this type directly, extends this to create to parse different broker messages
 */
export interface WsEventGeneric<EventType extends string> {
  event: EventType;
  timestamp: string;
}
