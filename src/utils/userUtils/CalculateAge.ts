import { DateTime } from "luxon";
export const calculateAge = (birthdate: string) => {
  // Convertir la chaîne de date de naissance en un objet DateTime
  const birthDateTime = DateTime.fromISO(birthdate);

  // Obtenir la date et l'heure actuelles
  const now = DateTime.now();

  // Calculer la différence en années
  const age = now.diff(birthDateTime, "years").years;

  // Retourner l'âge arrondi à l'entier inférieur
  return Math.floor(age);
};
