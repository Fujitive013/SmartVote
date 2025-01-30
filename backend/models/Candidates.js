const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    party: { type: String, required: true },
    bio: { type: String },
    image_url: { type: String },
});

module.exports = mongoose.model("Candidate", CandidateSchema);
