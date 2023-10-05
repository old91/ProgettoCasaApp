<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppartamentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apartaments', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('agent');
            $table->string('date');
            $table->string('city');//aggiungere
            $table->string('macro');//aggiungere
            $table->string('micro');//aggiungere
            $table->string('type');
            $table->boolean('renovate');
            $table->string('floor');
            $table->tinyInteger('floors');
            $table->tinyInteger('apartaments');
            $table->integer('fees');
            $table->year('year');
            $table->string('locals');
            $table->tinyInteger('bedrooms');
            $table->tinyInteger('bathrooms');
            $table->integer('surface');
            $table->boolean('balcony');
            $table->boolean('terrace');
            $table->boolean('garage');
            $table->boolean('parking');
            $table->boolean('cellar');
            $table->boolean('garden');
            $table->integer('price');
            $table->integer('estimate');
            $table->longText('images');
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apartaments');
    }
}
