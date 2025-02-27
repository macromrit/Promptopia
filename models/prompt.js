import {Schema, model, models} from "mongoose";

const PromptSchema = new Schema(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User', // one 2 many
        },
        prompt: {
            type: String,
            required: [true, "Prompt is required."],
        },
        tag: {
            type: String,
            requried: [true, 'Tag is required.'],
        }

    }
)

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;