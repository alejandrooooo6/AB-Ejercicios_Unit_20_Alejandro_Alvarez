/* Clean code principiles
 * 
 * Exercise: Detect clean code problems
 * 
 * Smells: Naming, SRP violated, code duplicity, magic numbers, error management, complex function
*/ 

type room = { name: string; nights: number; price: number; g?: number };
type booking = { id: string; user: string; rooms: room[]; discountType?: string; total?: number };

const discountPromo = 0.1
const discountStaff = 0.5
const discountVip = 0.2

export function calculateDiscountPrice(booked: booking): any {
  if (!booked || !booked.rooms || booked.rooms.length == 0) throw "error";

  let x = 0;
  for (let i = 0; i < booked.rooms.length; i++)  x += booked.rooms[i].nights * booked.rooms[i].price;

  if (booked.discountType) {
  if (booked.discountType === "promo") x = x - x * discountPromo;
  if (booked.discountType === "staff") x = x - x * discountStaff;
  if (booked.discountType === "vip") x = x - x * discountVip;
  }

  console.log("saving...", booked.id);
  console.log("email to...", booked.user);

  return { ok: true, t: x };
}

/**
 * Write here the problems you detected:
 * Incoherent naming conventions for variables, functions etc
 * DRY: Too many if`s
 * Magical nums, discount types
 * Errors not descriptive (line 16)
 * "x", "g", "t" should be named diffrently but I can*t figure out how to name them
 * 
 * 
 */