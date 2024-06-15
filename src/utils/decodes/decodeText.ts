// Utilisez un paquet comme 'he' pour décoder les entités HTML
import he from "he";

export function decodeText(text: string) {
  return he.decode(text);
}
