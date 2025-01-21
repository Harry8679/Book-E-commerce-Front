const Book = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Conteneur pour contrôler le placement et la taille */}
      <div className="w-full h-48 relative">
        <img
          src={product.imageUrl} // Utilisation du champ `imageUrl`
          alt={product.name}
          className="w-full h-full object-contain" // Utilisation de `object-contain` pour éviter les coupes
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600">{product.description.substring(0, 25)}...</p>
        <p className="text-teal-500 font-semibold">{product.price} €</p>
        <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
          Acheter maintenant
        </button>
      </div>
    </div>
  );
};

export default Book;
