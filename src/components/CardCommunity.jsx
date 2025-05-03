import { useNavigate } from "react-router-dom";

function CardCommunity({ community }) {
  const navigate = useNavigate();
  
  const forDetails = (item) => {
    navigate(`/detalhes/${item.id}`)
  };

  return (
    <div className="flex flex-wrap gap-5 w-full">
      {Array.isArray(community) &&
        community.map((item) => (
          <div
            key={item.id}
            role="button"
            className={`
              h-64
              w-full
              sm:w-[calc(50%-10px)]  <!-- Mobile primeiro -->
              lg:w-[calc(33%-11px)]  <!-- Depois desktop -->
              xl:w-[calc(25%-15px)] <!-- Opcional para telas maiores -->
              p-3 
              rounded-lg 
              flex 
              flex-col 
              bg-gray-300 
              text-gray-700
              shadow-md
            `}
            onClick={() => forDetails(item)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover border rounded"
            />
            <div className="text-lg font-medium truncate">{item.name}</div>
            <div className="line-clamp-2 text-sm text-gray-600">
              {item.description}
            </div>
          </div>
        ))}
    </div>
  );
}

export default CardCommunity;
