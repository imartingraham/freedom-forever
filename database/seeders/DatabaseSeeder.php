<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        /**
         * This file is quite large. I had to update the herd-lite php.ini
         * I set memory_limit = 512M
         * In a normal production environment we would be running this but
         * this was a quick way to import the data for the purposes of a take
         * home test
         */
        $sql = file_get_contents(__DIR__ . '/technical_interview_project_sql_dump.sql');
        Db::unprepared($sql);
    }
}
