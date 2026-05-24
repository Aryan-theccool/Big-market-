import * as Y from 'yjs';
import { createClient } from '@liveblocks/client';
import { LiveblocksYjsProvider } from '@liveblocks/yjs';

export type AwarenessUser = {
  name: string;
  color: string;
  cursor: { x: number; y: number } | null;
};

// Singleton Y.Doc per room — survives hot-reload and StrictMode double-mount
const rooms = new Map<string, { doc: Y.Doc; yElements: Y.Map<any> }>();

// Cache the Promise itself so concurrent calls never create two providers
// for the same room — this is what prevents the "already exists" error
const providerPromises = new Map<string, Promise<any>>();

// Initialize Liveblocks client with the provided Public API key
const client = createClient({
  publicApiKey: "pk_dev_Mx933cYAI6kOSZ4-Y8gyLjnpP7-4BON_LKDjqSUAjrl9ZS27tTU6gVijhPvPLB5d",
});

export function getYRoom(roomId: string) {
  if (rooms.has(roomId)) return rooms.get(roomId)!;
  const doc = new Y.Doc();
  const yElements = doc.getMap<any>('elements');
  rooms.set(roomId, { doc, yElements });
  return rooms.get(roomId)!;
}

export function getOrInitProvider(roomId: string, doc: Y.Doc): Promise<any> {
  if (providerPromises.has(roomId)) return providerPromises.get(roomId)!;
  
  const p = new Promise((resolve) => {
    // 1. Enter the Liveblocks room
    const { room } = client.enterRoom(`inkspace-board-${roomId}`);
    // 2. Initialize the Liveblocks Yjs Provider
    const provider = new LiveblocksYjsProvider(room, doc);
    resolve(provider);
  });
  
  providerPromises.set(roomId, p);
  return p;
}
