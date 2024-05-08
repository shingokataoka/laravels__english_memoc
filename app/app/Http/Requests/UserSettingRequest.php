<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class UserSettingRequest extends FormRequest
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
            'id' => ['required', 'integer'],
            // 'default_voice_name' => ['required', ''],
            'is_english_first_position' => ['required', 'integer', 'between:0,1'],
            'is_show_all_answers' => ['required', 'integer', 'between:0,1'],
            // 'default_speaking_speed' => ['required', 'integer'],
            // 'slow_speaking_speed' => ['required', 'integer'],
            'is_dark' => ['required', 'integer', 'between:0,1'],
        ];
    }
}
