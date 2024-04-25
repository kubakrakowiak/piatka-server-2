<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//        $this->call(ImageSeeder::class);
//        $this->command->info('Images table seeded!');
//
//        $this->call(EventTypeSeeder::class);
//        $this->command->info('EventTypes table seeded!');
//
//        $this->call(ArtistSeeder::class);
//        $this->command->info('Artists table seeded!');
//
//        $this->call(CompanySeeder::class);
//        $this->command->info('Companies table seeded!');
//
//        $this->call(UserSeeder::class);
//        $this->command->info('Users table seeded!');
//
//        $this->call(PlaceSeeder::class);
//        $this->command->info('Places table seeded!');
//
//        $this->call(EventSeeder::class);
//        $this->command->info('Events table seeded!');

        $this->call(RolesTableSeeder::class);
        $this->command->info('Roles and permissions seeded!');
    }
}
