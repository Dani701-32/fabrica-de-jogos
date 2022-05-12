<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;

class GameCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        DB::table('game_categories')->insert([
            'id' => 1,
            'name' => 'Anagram',
            'slug' => 'anagram',
            'description' => 'Anagrama',
            'creation_rules' => serialize(['options' => 'required|array|max:32',
                'options.*' => 'required|string|max:17']),
            'update_rules' => serialize(['options' => 'array|max:32',
                'options.*' => 'string|max:17'])
        ]);

        DB::table('game_categories')->insert([
            'id' => 2,
            'name' => 'Word Search',
            'slug' => 'word-search',
            'description' => 'Caça palavras',
            'creation_rules' => serialize(['options' => 'required|array|max:10',
                'options.*.word' => 'required|string|max:10',
                'options.*.tip' => 'required|string|200']),
            'update_rules' => serialize(['options' => 'array|max:10',
                'options.*.word' => 'string|max:10',
                'options.*.tip' => 'string|200'])
        ]);

        DB::table('game_categories')->insert([
            'id' => 3,
            'name' => 'Match Up',
            'slug' => 'match-up',
            'description' => 'Combinação',
            'creation_rules' => serialize(['options' => 'required|array|max:4',
                'options.*.word' => 'required|string|max:12',
                'options.*.meaning' => 'required|string|max:64']),
            'update_rules' => serialize(['options' => 'array|max:4',
                'options.*.word' => 'string|max:12',
                'options.*.meaning' => 'string|max:64'])
        ]);

        DB::table('game_categories')->insert([
            'id' => 4,
            'name' => 'Quiz',
            'slug' => 'quiz',
            'description' => 'Quiz',
            'creation_rules' => serialize(['options' => 'required|array|max:10',
                'options.*.title' => 'required|string',
                'options.*.answers' => 'required|array|max:5',
                'options.*.answers.*' => 'required|string|max:31']),
            'update_rules' => serialize(['options' => 'array|max:10',
                'options.*.title' => 'string',
                'options.*.answers' => 'array|max:5',
                'options.*.answers.*' => 'string|max:31'])
        ]);

        DB::table('game_categories')->insert([
            'id' => 5,
            'name' => 'True Or False',
            'slug' => 'true-or-false',
            'description' => 'Verdadeiro ou Falso',
            'creation_rules' => serialize(['options' => 'required|array|max:10',
                'options.*.title' => 'required|string|max:255',
                'options.*.answer' => 'required|boolean']),
            'update_rules' => serialize(['options' => 'array|max:10',
                'options.*.title' => 'string|max:255',
                'options.*.answer' => 'boolean'])
        ]);

        DB::table('game_categories')->insert([
            'id' => 6,
            'name' => 'Group Sort',
            'slug' => 'group-sort',
            'description' => 'Ordenação por Grupos',
            'creation_rules' => serialize(['options' => 'required|array|max:2',
                'options.*.title' => 'required|string|max:185',
                'options.*.items' => 'required|array|max:400',
                'options.*.items.*' => 'required|string|max:20']),
            'update_rules' => serialize(['options' => 'array|max:2',
                'options.*.title' => 'string|max:185',
                'options.*.items' => 'array|max:400',
                'options.*.items.*' => 'string|max:20'])
        ]);

        DB::table('game_categories')->insert([
            'id' => 7,
            'name' => 'Balloons',
            'slug' => 'bloons',
            'description' => 'Jogo do macaco',
            'creation_rules' => serialize(['options' => 'required|array|max:2',
                'options.*.title' => 'required|string|max:127',
                'options.*.answers' => 'required|array|max:5',
                'options.*.answers.*' => 'required|string|max:12']),
            'update_rules' => serialize(['options' => 'array|max:2',
                'options.*.title' => 'string|max:127',
                'options.*.answers' => 'array|max:5',
                'options.*.answers.*' => 'string|max:12'])
        ]);

        DB::table('game_categories')->insert([
            'id' => 8,
            'name' => 'Cryptogram',
            'slug' => 'cryptogram',
            'description' => 'Criptograma',
            'creation_rules' => serialize(['options' => 'required|array|max:4',
                'options.*.word' => 'required|string|max:10',
                'options.*.tip' => 'required|string|max:45']),
            'update_rules' => serialize(['options' => 'array|max:4',
                'options.*.word' => 'string|max:10',
                'options.*.tip' => 'string|max:45'])
        ]);
    }
}