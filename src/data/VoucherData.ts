export interface GameVoucher {
    id: string;
    name: string;
    image: string;
    description: string;
    inputs: { label: string; name: string }[];
    options: {
      id: string;
      label: string;
      icon: string;
      price: number;
      type: "package" | "satuan"; 
    }[];
  }
  
  export const voucherData: GameVoucher[] = [
    {
      id: "ml",
      name: "Mobile Legends",
      image: "/assets/ml.jpg",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus ab quaerat sunt ipsa amet, libero explicabo, voluptatum eaque laudantium voluptas est? Maiores at, quia saepe dolorum incidunt neque! Iste, totam. ",
      inputs: [
        { label: "User ID", name: "userId" },
        { label: "Zone ID", name: "zoneId" },
      ],
      options: [
        { id: "ml-1", label: "1 Diamond", icon: "💎", price: 300, type: "satuan" },
        { id: "ml-2", label: "5 Diamonds", icon: "💎", price: 1500, type: "satuan" },
        { id: "ml-3", label: "86 Diamonds", icon: "💎", price: 20000, type: "package" },
        { id: "ml-4", label: "172 Diamonds", icon: "💎", price: 40000, type: "package" },
      ],
    },
    {
      id: "ff",
      name: "Free Fire",
      image: "/assets/ff.jpg", 
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus ab quaerat sunt ipsa amet, libero explicabo, voluptatum eaque laudantium voluptas est? Maiores at, quia saepe dolorum incidunt neque! Iste, totam. ",
      inputs: [{ label: "User ID", name: "userId" }],
      options: [
        { id: "ff-1", label: "35 Diamonds", icon: "🔥", price: 8000, type: "satuan" },
        { id: "ff-2", label: "70 Diamonds", icon: "🔥", price: 16000, type: "package" },
        { id: "ff-3", label: "140 Diamonds", icon: "🔥", price: 32000, type: "package" },
      ],
    },
    {
      id: "genshin",
      name: "Genshin Impact",
      image: "/assets/genshin.jpg",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus ab quaerat sunt ipsa amet, libero explicabo, voluptatum eaque laudantium voluptas est? Maiores at, quia saepe dolorum incidunt neque! Iste, totam. ",
      inputs: [
        { label: "UID", name: "uid" },
        { label: "Server", name: "server" },
      ],
      options: [
        { id: "gen-1", label: "60 Primogems", icon: "✨", price: 15000, type: "satuan" },
        { id: "gen-2", label: "300 Primogems", icon: "✨", price: 50000, type: "package" },
        { id: "gen-3", label: "980 Primogems", icon: "✨", price: 125000, type: "package" },
      ],
    },
  ];
  