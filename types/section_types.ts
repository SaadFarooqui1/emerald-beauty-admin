import { MediaI } from "./media_types"
import { SubSectionsI } from "./sub_sections_types"

export interface SectionI {
    id: number
    name: string
    heading: string
    arabic_heading: string
    description: string
    arabic_description: string
    media: MediaI[]
    sub_sections: SubSectionsI[]
    created_at: string
    updated_at: string
}