<?php

namespace App\Http\Requests;

use App\Models\Entry;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateEntryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {

        /** @var Entry $entry */
        $entry = $this->route('entry');

        return $this->user()->is($entry->user);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            //

            'title'     => ['nullable', 'string'],
            'unit'      => ['nullable', 'string'],
            'completed' => ['nullable', 'numeric', 'lte:total'],
            'total'     => ['nullable', 'numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'completed.lte' => 'Completed must be less than or equal to total',
        ];
    }
}
