<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppartamentDraftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apartament_drafts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('agent')->nullable();
            $table->string('date')->nullable();
            $table->string('city')->nullable();//aggiungere
            $table->string('macro')->nullable();//aggiungere
            $table->string('micro')->nullable();//aggiungere
            $table->string('type')->nullable();
            $table->boolean('renovate')->nullable();
            $table->string('floor')->nullable();
            $table->tinyInteger('floors')->nullable();
            $table->tinyInteger('apartaments')->nullable();
            $table->integer('fees')->nullable();
            $table->year('year')->nullable();
            $table->string('locals')->nullable();
            $table->tinyInteger('bedrooms')->nullable();
            $table->tinyInteger('bathrooms')->nullable();
            $table->integer('surface')->nullable();
            $table->boolean('balcony')->nullable();
            $table->boolean('terrace')->nullable();
            $table->boolean('garage')->nullable();
            $table->boolean('parking')->nullable();
            $table->boolean('cellar')->nullable();
            $table->boolean('garden')->nullable();
            $table->integer('price')->nullable();
            $table->integer('estimate')->nullable();
            $table->longText('images')->nullable();
            $table->text('description')->nullable();
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
        Schema::dropIfExists('apartament_drafts');
    }
}
