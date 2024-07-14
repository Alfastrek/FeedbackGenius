import {z} from 'zod';  

export const messageSchema=z.object({
    content:z.string().min(10,"Message must contain at least 10 characters")
    .max(300,"Message must contain at most 300 characters")
})