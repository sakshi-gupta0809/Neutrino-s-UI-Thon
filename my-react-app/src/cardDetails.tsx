import { useParams } from 'react-router-dom';
import { cards } from './Cards';

function CardDetail() {
  const { id } = useParams() || {id:0};
  const data = cards[Number(id)];

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">
        <h1 className="text-2xl font-bold">Card not found</h1>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${data.image})`,flex:1,width:"100%",height:700,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat" }}
    >
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-2xl max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{data.title}</h1>
        <div className="title h2"> {data.description }</div>
        <br/>
        <br/>
         <div className="title h1"> {data.details }</div>
         <button onClick={window.location.href =data.nextpageurl}>
      Go to Google
    </button>
      </div>
    </div>
  );
}

export default CardDetail;
