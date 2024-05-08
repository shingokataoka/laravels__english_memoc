<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookOrWordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['required', 'numeric','min:0'],
            'book_id' => ['required', 'numeric','min:1','exists:book_or_words,id'],
            'sort_order_number' => ['required', 'numeric','min:1'],
            'type_is_book' => ['required', 'numeric', 'between:0,1'],
            'english_word' => ['nullable', 'string'],
            'japanese_word' => ['nullable', 'string'],
        ];
    }
}
