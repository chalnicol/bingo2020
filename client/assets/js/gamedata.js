const gameData = [
	
    { 
        "name" : "Any Vertical", 
        "jackpot" : 250000, 
        "consolation" : 1500,
        "numbers" : 25, 
        "points" :  [ 
                        [ 0, 1, 2, 3, 4 ], 
                        [ 5, 6, 7, 8, 9 ],
                        [ 10, 11, 12, 13, 14 ],
                        [ 15, 16, 17, 18, 19 ],
                        [ 20, 21, 22, 23, 24 ],
                         
                    ]
    },
    {
        "name" : "Any Horizontal", 
        "jackpot" : 250000, 
        "consolation" : 1500,
        "numbers" : 25, 
        "points" :  [ 
                        [ 0, 5, 10, 15, 20 ], 
                        [ 1, 6, 11, 16, 21 ], 
                        [ 2, 7, 12, 17, 22 ],
                        [ 3, 8, 13, 18, 23 ],
                        [ 4, 9, 14, 19, 24 ],
                    ]
    },
    { 
        "name" : "Any Square", 
        "jackpot" : 250000, 
        "consolation" : 1500,
        "numbers" : 25, 
        "points" : [ 
                    [ 0, 1, 5, 6, 12 ],
                    [ 3, 4, 8, 9, 12 ],
                    [ 12, 18, 19, 23, 24 ],
                    [ 12, 15, 16, 20, 21 ] 
                ]
    },
    {
        "name" : "Any Diagonal", 
        "jackpot" : 250000, 
        "consolation" : 1500,
        "numbers" : 25, 
        "points" :  [ [ 0, 6, 12, 18, 24 ], 
                    [ 4, 8, 12, 16, 20 ] ]
    },
    { 	"name" : "Any Box", 
        "jackpot" : 250000, 
        "consolation" : 1500,
        "numbers" : 25, 
        "points" : [ [ 0, 4, 12, 20, 24 ], 
                   [ 6, 8, 12, 16, 18 ] ] 
    },
    { 	"name" : "Any Cross", 
        "jackpot" : 250000, 
        "consolation" : 1500,
        "numbers" : 25, 
        "points" : [ [ 7, 11, 12, 13, 17 ], 
                   [ 2, 10, 12, 14, 22 ] ] 
    },
    {   "name" : "Blackout", 
        "jackpot" : 1000000, 
        "consolation" : 5000,
        "numbers" : 45, 
        "points" : [ [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24 ] ] 
    }
    
]