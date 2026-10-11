
const { estNonVide, estEmailValide } = require('../utils/validators');
let users = [
  { id: 1, name: 'Aya', email: 'aya@example.com', role: 'user' },
  { id: 2, name: 'Rihem', email: 'rihem@example.com', role: 'user' },
  { id: 3, name: 'Hiba', email: 'hiba@example.com', role: 'admin' }
];
//Implémentez getAllUsers (avec filtre optionnel ?role=...).
let prochainId = 4;

const getAllUsers = (req, res) => {
  const { role } = req.query;
  let resultat = users;

  if (role) {
    resultat = users.filter((user) => user.role === role);
  }

  return res.status(200).json({ total: resultat.length, users: resultat });
};



const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({ error: `Utilisateur ${id} non trouvé` });
  }

  return res.status(200).json({ user });
};

// Implémentez createUser (validation obligatoire de name et email, statut 201).
const createUser = (req, res) => {
  const { name, email, role } = req.body || {};

  if (!estNonVide(name)) {
    return res.status(400).json({ error: 'Le nom ne peut pas être vide.' });
  }

  if (!estEmailValide(email)) {
    return res.status(400).json({ error: 'L’email est invalide. Il doit contenir @ et un point.' });
  }

  const nouvelUtilisateur = { id: prochainId, name, email, role };
  prochainId += 1;
  users.push(nouvelUtilisateur);

  return res.status(201).json({ message: 'Utilisateur créé', user: nouvelUtilisateur });
};

// Implémentez deleteUser (supprime l’utilisateur ou 404).
const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const userExiste = users.some((u) => u.id === id);

  if (!userExiste) {
    return res.status(404).json({ error: `Impossible de supprimer : utilisateur ${id} non trouvé` });
  }

  users = users.filter((u) => u.id !== id);
  return res.status(200).json({ message: `Utilisateur ${id} supprimé avec succès` });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser
};