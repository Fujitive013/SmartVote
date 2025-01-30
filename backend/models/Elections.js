const ElectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    candidates: [
        {
            candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
            name: { type: String, required: true },
            party: { type: String, required: true },
        },
    ],
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
});

module.exports = mongoose.model("Election", ElectionSchema);
