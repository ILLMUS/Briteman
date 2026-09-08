export const CONTACT = {
  brand: "Briteman",
  brandFull: "Briteman Services",
  brandLegal: "Briteman Services",
  tagline: "Eswatini's Trusted IT & Electronics Store",
  phones: ["+268 7662 3733", "+268 7662 3730", "+268 7976 2221", "+268 3450 1703"],
  whatsappNumber: "26876623733",
  email: "ajapresd@gmail.com",
  website: "www.britemanservices.com",
  // Primary (kept for backwards compatibility with older references)
  address: {
    line1: "Unit No.10, First Floor, LM Building",
    line2: "Plot 305, Somhlolo Road",
    city: "Mbabane, Eswatini",
  },
  locations: [
    {
      name: "Mbabane Branch",
      line1: "Unit No.10, First Floor, LM Building",
      line2: "Plot 305, Somhlolo Road",
      city: "Mbabane, Eswatini",
      mapQuery: "LM+Building,+Plot+305,+Somhlolo+Road,+Mbabane,+Eswatini",
      phones: ["+268 7662 3733", "+268 7662 3730", "+268 7976 2221", "+268 3450 1703"],
    },
    {
      name: "Manzini Branch",
      line1: "The Hyatt Building Complex, 217 Maphaka Street",
      line2: "Ground Floor No. 9, Near Satellite Bus Rank",
      city: "Manzini, Eswatini",
      mapQuery: "Hyatt+Building+Complex,+217+Maphaka+Street,+Manzini,+Eswatini",
      phones: ["+268 7662 3733", "+268 7888 2850", "+268 7928 8898"],
    },
  ],
  hours: [
    { day: "Mon – Fri", time: "08:00 – 18:00" },
    { day: "Saturday", time: "09:00 – 16:00" },
    { day: "Sunday", time: "Closed" },
  ],
};

export const WHATSAPP_LINK = (
  msg = "Hi Briteman Services, I'd like to enquire about a product.",
  branch?: string,
) => {
  const b = branch ? ` (${branch})` : "";
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    msg.replace("Briteman Services", `Briteman Services${b}`),
  )}`;
};
