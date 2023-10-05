<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surname');
            $table->string('email')->unique();
            $table->enum('role',['vendor','admin']);
            $table->string('ref_user');
            $table->boolean('first')->default(true);
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
        DB::table('users')->insert(
            array(
                'email' => 'montevecchi.stefano@gmail.com',
                'name'  => 'Stefano',
                'surname' => 'Montevecchi',
                'role' => 'admin',
                'ref_user' => 'SM00',
                'password' => bcrypt('1234')
            )
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
