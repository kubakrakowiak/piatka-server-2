<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            "companyId" => ['required', 'exists:companies,id'],
            'eventTypeId' => ['required', 'exists:event_types,id'],
            "startingAt" => ['required', 'date'],
            "locationLng" =>  ['required', 'numeric'],
            "locationLat" => ['required', 'numeric'],
            "ticketPrice" => ['required', 'numeric'],
        ];
    }
}
