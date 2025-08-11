import CharacterCard from './CharacterCard';

const CharacterList = ({ characters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-6xl mx-auto">
      {characters.map(char => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  );
};

export default CharacterList;
