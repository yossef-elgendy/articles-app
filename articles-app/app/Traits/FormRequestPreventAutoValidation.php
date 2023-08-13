<?php
namespace App\Traits;

trait FormRequestPreventAutoValidation
{
  public function validateResolved()
  {
    $this->prepareForValidation();

    if (!$this->passesAuthorization()) {
      $this->failedAuthorization();
    }

    $this->passedValidation();
  }
}
