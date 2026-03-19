export const categories = ["Todos", "Shows", "Stand-up", "Teatro", "Esportes"];

export const events = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=1600&q=60",
    title: "Festival Eletrônico Summer Bass",
    date: "12 Abr 2026 · 22h",
    location: "Arena Soundwave, São Paulo",
    price: "R$ 89,00",
    category: "Shows",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=1600&q=60",
    title: "Stand-up Comedy Night",
    date: "18 Abr 2026 · 20h",
    location: "Teatro Municipal, Rio de Janeiro",
    price: "R$ 65,00",
    category: "Stand-up",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1600&q=60",
    title: "Rock in Concert 2026",
    date: "25 Abr 2026 · 19h",
    location: "Estádio Nacional, Brasília",
    price: "R$ 120,00",
    category: "Shows",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?auto=format&fit=crop&w=1600&q=60",
    title: "O Fantasma da Ópera",
    date: "02 Mai 2026 · 20h30",
    location: "Teatro Alfa, São Paulo",
    price: "R$ 150,00",
    category: "Teatro",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=60",
    title: "Final Copa Nacional",
    date: "10 Mai 2026 · 16h",
    location: "Maracanã, Rio de Janeiro",
    price: "R$ 200,00",
    category: "Esportes",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=60",
    title: "DJ Night: Beats & Vibes",
    date: "15 Mai 2026 · 23h",
    location: "Club Nova, Curitiba",
    price: "R$ 75,00",
    category: "Shows",
  },
];

export const mockUsers = [
  { id: 1, name: "João Silva", email: "joao@email.com", role: "user", ingressos: 3 },
  { id: 2, name: "Maria Santos", email: "maria@email.com", role: "admin", ingressos: 5 },
  { id: 3, name: "Pedro Costa", email: "pedro@email.com", role: "user", ingressos: 1 },
  { id: 4, name: "Ana Oliveira", email: "ana@email.com", role: "user", ingressos: 2 },
];

export const mockLoggedUser = { name: "João Silva", email: "joao@email.com", ingressos: 3 };
