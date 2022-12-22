import './SectionTitle.css'

const SectionTitle = ({ title, button }) => {
  return (
    <div className='wrapper'>
      <span className='fresh-new unnamed-character-style-5'>{title}</span>
      <span></span>
      {button}
    </div>
  );
};

export default SectionTitle;
