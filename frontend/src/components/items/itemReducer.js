

export const itemReducer = (state, action) => {
    console.log(state, action)
    switch (action.type) {
        case "PORTFOLIO": {
            return {

                "initState": { title: "", description: "" },
                "updateMutation": "updateFile",
                "submitItem": (inputs, file, post, docId) => {
                    console.log(inputs)
                    post({
                        variables: {
                            captionInput: {
                                title: inputs.title,
                                description: inputs.description
                            },
                            file,
                            docId
                        }
                    });

                }
            }
        }
        case "GIGS": {
            return {
                "initState": { title: "", description: "", categories: [], garment: "", price: 0, fabrics: [], delivery: 0 },
                "updateMutation": "updateGig",
                "submitItem": (inputs, file, post) => {
                    if (inputs.price) inputs.price = parseInt(inputs.price);
                    if (inputs.delivery) inputs.delivery = parseInt(inputs.delivery);
                    post({ variables: { itemInput: { ...inputs, imageUrl: undefined, creator: undefined, __typename: undefined }, file } });

                }
            }
        }


        default: return
    }
}