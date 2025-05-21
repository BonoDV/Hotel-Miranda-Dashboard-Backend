export type Room = {
  roomNumber: number;
  roomType: string;
  bedType: string;
  roomFloor: string;
  photos: string[]; // URLs de imágenes
  description: string;
  offer: "YES" | "NO"; // Puedes limitarlo si solo hay dos opciones
  price: number;
  discount: number; // Porcentaje
  cancellation: string;
  amenities: string[];
};
