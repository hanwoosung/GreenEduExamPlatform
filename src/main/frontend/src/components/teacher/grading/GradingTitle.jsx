const GradingTitle = ({ title, onBack }) => (
    <div className="subtitle-container">
        {onBack && <button onClick={onBack} className="backButton">←</button>}
        <h2 className="subtitle">{title}</h2>
    </div>
);
export default GradingTitle;
