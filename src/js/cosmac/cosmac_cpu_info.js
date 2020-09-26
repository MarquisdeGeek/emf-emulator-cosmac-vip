// cosmac_cpu_info
let cosmac_cpu_info = (function(bus, options) {
  // ext
  // 00 
  // Unknown: 01
  // Unknown: 02
  // Unknown: 03
  // Unknown: 04
  // Unknown: 05
  // Unknown: 06
  // Unknown: 07
  // Unknown: 08
  // Unknown: 09
  // Unknown: 0a
  // Unknown: 0b
  // Unknown: 0c
  // Unknown: 0d
  // Unknown: 0e
  // Unknown: 0f

  // 10 nnn           : jp nnn


  // 11 nnn           : jp nnn


  // 12 nnn           : jp nnn


  // 13 nnn           : jp nnn


  // 14 nnn           : jp nnn


  // 15 nnn           : jp nnn


  // 16 nnn           : jp nnn


  // 17 nnn           : jp nnn


  // 18 nnn           : jp nnn


  // 19 nnn           : jp nnn


  // 1a nnn           : jp nnn


  // 1b nnn           : jp nnn


  // 1c nnn           : jp nnn


  // 1d nnn           : jp nnn


  // 1e nnn           : jp nnn


  // 1f nnn           : jp nnn


  // 20 nnnnnnnnn     : call nnn


  // 21 nnnnnnnnn     : call nnn


  // 22 nnnnnnnnn     : call nnn


  // 23 nnnnnnnnn     : call nnn


  // 24 nnnnnnnnn     : call nnn


  // 25 nnnnnnnnn     : call nnn


  // 26 nnnnnnnnn     : call nnn


  // 27 nnnnnnnnn     : call nnn


  // 28 nnnnnnnnn     : call nnn


  // 29 nnnnnnnnn     : call nnn


  // 2a nnnnnnnnn     : call nnn


  // 2b nnnnnnnnn     : call nnn


  // 2c nnnnnnnnn     : call nnn


  // 2d nnnnnnnnn     : call nnn


  // 2e nnnnnnnnn     : call nnn


  // 2f nnnnnnnnn     : call nnn


  // 30 nn            : skipeq v0, nn


  // 31 nn            : skipeq v1, nn


  // 32 nn            : skipeq v2, nn


  // 33 nn            : skipeq v3, nn


  // 34 nn            : skipeq v4, nn


  // 35 nn            : skipeq v5, nn


  // 36 nn            : skipeq v6, nn


  // 37 nn            : skipeq v7, nn


  // 38 nn            : skipeq v8, nn


  // 39 nn            : skipeq v9, nn


  // 3a nn            : skipeq va, nn


  // 3b nn            : skipeq vb, nn


  // 3c nn            : skipeq vc, nn


  // 3d nn            : skipeq vd, nn


  // 3e nn            : skipeq ve, nn


  // 3f nn            : skipeq vf, nn


  // 40 nn            : skipneq v0, nn


  // 41 nn            : skipneq v1, nn


  // 42 nn            : skipneq v2, nn


  // 43 nn            : skipneq v3, nn


  // 44 nn            : skipneq v4, nn


  // 45 nn            : skipneq v5, nn


  // 46 nn            : skipneq v6, nn


  // 47 nn            : skipneq v7, nn


  // 48 nn            : skipneq v8, nn


  // 49 nn            : skipneq v9, nn


  // 4a nn            : skipneq va, nn


  // 4b nn            : skipneq vb, nn


  // 4c nn            : skipneq vc, nn


  // 4d nn            : skipneq vd, nn


  // 4e nn            : skipneq ve, nn


  // 4f nn            : skipneq vf, nn

  // ext
  // 50 
  // ext
  // 51 
  // ext
  // 52 
  // ext
  // 53 
  // ext
  // 54 
  // ext
  // 55 
  // ext
  // 56 
  // ext
  // 57 
  // ext
  // 58 
  // ext
  // 59 
  // ext
  // 5a 
  // ext
  // 5b 
  // ext
  // 5c 
  // ext
  // 5d 
  // ext
  // 5e 
  // ext
  // 5f 

  // 60 nn            : store v0, nn


  // 61 nn            : store v1, nn


  // 62 nn            : store v2, nn


  // 63 nn            : store v3, nn


  // 64 nn            : store v4, nn


  // 65 nn            : store v5, nn


  // 66 nn            : store v6, nn


  // 67 nn            : store v7, nn


  // 68 nn            : store v8, nn


  // 69 nn            : store v9, nn


  // 6a nn            : store va, nn


  // 6b nn            : store vb, nn


  // 6c nn            : store vc, nn


  // 6d nn            : store vd, nn


  // 6e nn            : store ve, nn


  // 6f nn            : store vf, nn


  // 70 nn            : add v0, nn


  // 71 nn            : add v1, nn


  // 72 nn            : add v2, nn


  // 73 nn            : add v3, nn


  // 74 nn            : add v4, nn


  // 75 nn            : add v5, nn


  // 76 nn            : add v6, nn


  // 77 nn            : add v7, nn


  // 78 nn            : add v8, nn


  // 79 nn            : add v9, nn


  // 7a nn            : add va, nn


  // 7b nn            : add vb, nn


  // 7c nn            : add vc, nn


  // 7d nn            : add vd, nn


  // 7e nn            : add ve, nn


  // 7f nn            : add vf, nn

  // ext
  // 80 
  // ext
  // 81 
  // ext
  // 82 
  // ext
  // 83 
  // ext
  // 84 
  // ext
  // 85 
  // ext
  // 86 
  // ext
  // 87 
  // ext
  // 88 
  // ext
  // 89 
  // ext
  // 8a 
  // ext
  // 8b 
  // ext
  // 8c 
  // ext
  // 8d 
  // ext
  // 8e 
  // ext
  // 8f 
  // ext
  // 90 
  // ext
  // 91 
  // ext
  // 92 
  // ext
  // 93 
  // ext
  // 94 
  // ext
  // 95 
  // ext
  // 96 
  // ext
  // 97 
  // ext
  // 98 
  // ext
  // 99 
  // ext
  // 9a 
  // ext
  // 9b 
  // ext
  // 9c 
  // ext
  // 9d 
  // ext
  // 9e 
  // ext
  // 9f 

  // a0 nnn           : ld I, nnn


  // a1 nnn           : ld I, nnn


  // a2 nnn           : ld I, nnn


  // a3 nnn           : ld I, nnn


  // a4 nnn           : ld I, nnn


  // a5 nnn           : ld I, nnn


  // a6 nnn           : ld I, nnn


  // a7 nnn           : ld I, nnn


  // a8 nnn           : ld I, nnn


  // a9 nnn           : ld I, nnn


  // aa nnn           : ld I, nnn


  // ab nnn           : ld I, nnn


  // ac nnn           : ld I, nnn


  // ad nnn           : ld I, nnn


  // ae nnn           : ld I, nnn


  // af nnn           : ld I, nnn


  // b0 nnn           : jp nnn + V0


  // b1 nnn           : jp nnn + V0


  // b2 nnn           : jp nnn + V0


  // b3 nnn           : jp nnn + V0


  // b4 nnn           : jp nnn + V0


  // b5 nnn           : jp nnn + V0


  // b6 nnn           : jp nnn + V0


  // b7 nnn           : jp nnn + V0


  // b8 nnn           : jp nnn + V0


  // b9 nnn           : jp nnn + V0


  // ba nnn           : jp nnn + V0


  // bb nnn           : jp nnn + V0


  // bc nnn           : jp nnn + V0


  // bd nnn           : jp nnn + V0


  // be nnn           : jp nnn + V0


  // bf nnn           : jp nnn + V0


  // c0 nn            : rnd v0, nn


  // c1 nn            : rnd v1, nn


  // c2 nn            : rnd v2, nn


  // c3 nn            : rnd v3, nn


  // c4 nn            : rnd v4, nn


  // c5 nn            : rnd v5, nn


  // c6 nn            : rnd v6, nn


  // c7 nn            : rnd v7, nn


  // c8 nn            : rnd v8, nn


  // c9 nn            : rnd v9, nn


  // ca nn            : rnd va, nn


  // cb nn            : rnd vb, nn


  // cc nn            : rnd vc, nn


  // cd nn            : rnd vd, nn


  // ce nn            : rnd ve, nn


  // cf nn            : rnd vf, nn

  // ext
  // d0 
  // ext
  // d1 
  // ext
  // d2 
  // ext
  // d3 
  // ext
  // d4 
  // ext
  // d5 
  // ext
  // d6 
  // ext
  // d7 
  // ext
  // d8 
  // ext
  // d9 
  // ext
  // da 
  // ext
  // db 
  // ext
  // dc 
  // ext
  // dd 
  // ext
  // de 
  // ext
  // df 
  // ext
  // e0 
  // ext
  // e1 
  // ext
  // e2 
  // ext
  // e3 
  // ext
  // e4 
  // ext
  // e5 
  // ext
  // e6 
  // ext
  // e7 
  // ext
  // e8 
  // ext
  // e9 
  // ext
  // ea 
  // ext
  // eb 
  // ext
  // ec 
  // ext
  // ed 
  // ext
  // ee 
  // ext
  // ef 
  // ext
  // f0 
  // ext
  // f1 
  // ext
  // f2 
  // ext
  // f3 
  // ext
  // f4 
  // ext
  // f5 
  // ext
  // f6 
  // ext
  // f7 
  // ext
  // f8 
  // ext
  // f9 
  // ext
  // fa 
  // ext
  // fb 
  // ext
  // fc 
  // ext
  // fd 
  // ext
  // fe 
  // ext
  // ff 

  // 00 nn            : dc.b nn


  // 01 nn            : dc.b nn


  // 02 nn            : dc.b nn


  // 03 nn            : dc.b nn


  // 04 nn            : dc.b nn


  // 05 nn            : dc.b nn


  // 06 nn            : dc.b nn


  // 07 nn            : dc.b nn


  // 08 nn            : dc.b nn


  // 09 nn            : dc.b nn


  // 0a nn            : dc.b nn


  // 0b nn            : dc.b nn


  // 0c nn            : dc.b nn


  // 0d nn            : dc.b nn


  // 0e nn            : dc.b nn


  // 0f nn            : dc.b nn


  // 10 nn            : dc.b nn


  // 11 nn            : dc.b nn


  // 12 nn            : dc.b nn


  // 13 nn            : dc.b nn


  // 14 nn            : dc.b nn


  // 15 nn            : dc.b nn


  // 16 nn            : dc.b nn


  // 17 nn            : dc.b nn


  // 18 nn            : dc.b nn


  // 19 nn            : dc.b nn


  // 1a nn            : dc.b nn


  // 1b nn            : dc.b nn


  // 1c nn            : dc.b nn


  // 1d nn            : dc.b nn


  // 1e nn            : dc.b nn


  // 1f nn            : dc.b nn


  // 20 nn            : dc.b nn


  // 21 nn            : dc.b nn


  // 22 nn            : dc.b nn


  // 23 nn            : dc.b nn


  // 24 nn            : dc.b nn


  // 25 nn            : dc.b nn


  // 26 nn            : dc.b nn


  // 27 nn            : dc.b nn


  // 28 nn            : dc.b nn


  // 29 nn            : dc.b nn


  // 2a nn            : dc.b nn


  // 2b nn            : dc.b nn


  // 2c nn            : dc.b nn


  // 2d nn            : dc.b nn


  // 2e nn            : dc.b nn


  // 2f nn            : dc.b nn


  // 30 nn            : dc.b nn


  // 31 nn            : dc.b nn


  // 32 nn            : dc.b nn


  // 33 nn            : dc.b nn


  // 34 nn            : dc.b nn


  // 35 nn            : dc.b nn


  // 36 nn            : dc.b nn


  // 37 nn            : dc.b nn


  // 38 nn            : dc.b nn


  // 39 nn            : dc.b nn


  // 3a nn            : dc.b nn


  // 3b nn            : dc.b nn


  // 3c nn            : dc.b nn


  // 3d nn            : dc.b nn


  // 3e nn            : dc.b nn


  // 3f nn            : dc.b nn


  // 40 nn            : dc.b nn


  // 41 nn            : dc.b nn


  // 42 nn            : dc.b nn


  // 43 nn            : dc.b nn


  // 44 nn            : dc.b nn


  // 45 nn            : dc.b nn


  // 46 nn            : dc.b nn


  // 47 nn            : dc.b nn


  // 48 nn            : dc.b nn


  // 49 nn            : dc.b nn


  // 4a nn            : dc.b nn


  // 4b nn            : dc.b nn


  // 4c nn            : dc.b nn


  // 4d nn            : dc.b nn


  // 4e nn            : dc.b nn


  // 4f nn            : dc.b nn


  // 50 nn            : dc.b nn


  // 51 nn            : dc.b nn


  // 52 nn            : dc.b nn


  // 53 nn            : dc.b nn


  // 54 nn            : dc.b nn


  // 55 nn            : dc.b nn


  // 56 nn            : dc.b nn


  // 57 nn            : dc.b nn


  // 58 nn            : dc.b nn


  // 59 nn            : dc.b nn


  // 5a nn            : dc.b nn


  // 5b nn            : dc.b nn


  // 5c nn            : dc.b nn


  // 5d nn            : dc.b nn


  // 5e nn            : dc.b nn


  // 5f nn            : dc.b nn


  // 60 nn            : dc.b nn


  // 61 nn            : dc.b nn


  // 62 nn            : dc.b nn


  // 63 nn            : dc.b nn


  // 64 nn            : dc.b nn


  // 65 nn            : dc.b nn


  // 66 nn            : dc.b nn


  // 67 nn            : dc.b nn


  // 68 nn            : dc.b nn


  // 69 nn            : dc.b nn


  // 6a nn            : dc.b nn


  // 6b nn            : dc.b nn


  // 6c nn            : dc.b nn


  // 6d nn            : dc.b nn


  // 6e nn            : dc.b nn


  // 6f nn            : dc.b nn


  // 70 nn            : dc.b nn


  // 71 nn            : dc.b nn


  // 72 nn            : dc.b nn


  // 73 nn            : dc.b nn


  // 74 nn            : dc.b nn


  // 75 nn            : dc.b nn


  // 76 nn            : dc.b nn


  // 77 nn            : dc.b nn


  // 78 nn            : dc.b nn


  // 79 nn            : dc.b nn


  // 7a nn            : dc.b nn


  // 7b nn            : dc.b nn


  // 7c nn            : dc.b nn


  // 7d nn            : dc.b nn


  // 7e nn            : dc.b nn


  // 7f nn            : dc.b nn


  // 80 nn            : dc.b nn


  // 81 nn            : dc.b nn


  // 82 nn            : dc.b nn


  // 83 nn            : dc.b nn


  // 84 nn            : dc.b nn


  // 85 nn            : dc.b nn


  // 86 nn            : dc.b nn


  // 87 nn            : dc.b nn


  // 88 nn            : dc.b nn


  // 89 nn            : dc.b nn


  // 8a nn            : dc.b nn


  // 8b nn            : dc.b nn


  // 8c nn            : dc.b nn


  // 8d nn            : dc.b nn


  // 8e nn            : dc.b nn


  // 8f nn            : dc.b nn


  // 90 nn            : dc.b nn


  // 91 nn            : dc.b nn


  // 92 nn            : dc.b nn


  // 93 nn            : dc.b nn


  // 94 nn            : dc.b nn


  // 95 nn            : dc.b nn


  // 96 nn            : dc.b nn


  // 97 nn            : dc.b nn


  // 98 nn            : dc.b nn


  // 99 nn            : dc.b nn


  // 9a nn            : dc.b nn


  // 9b nn            : dc.b nn


  // 9c nn            : dc.b nn


  // 9d nn            : dc.b nn


  // 9e nn            : dc.b nn


  // 9f nn            : dc.b nn


  // a0 nn            : dc.b nn


  // a1 nn            : dc.b nn


  // a2 nn            : dc.b nn


  // a3 nn            : dc.b nn


  // a4 nn            : dc.b nn


  // a5 nn            : dc.b nn


  // a6 nn            : dc.b nn


  // a7 nn            : dc.b nn


  // a8 nn            : dc.b nn


  // a9 nn            : dc.b nn


  // aa nn            : dc.b nn


  // ab nn            : dc.b nn


  // ac nn            : dc.b nn


  // ad nn            : dc.b nn


  // ae nn            : dc.b nn


  // af nn            : dc.b nn


  // b0 nn            : dc.b nn


  // b1 nn            : dc.b nn


  // b2 nn            : dc.b nn


  // b3 nn            : dc.b nn


  // b4 nn            : dc.b nn


  // b5 nn            : dc.b nn


  // b6 nn            : dc.b nn


  // b7 nn            : dc.b nn


  // b8 nn            : dc.b nn


  // b9 nn            : dc.b nn


  // ba nn            : dc.b nn


  // bb nn            : dc.b nn


  // bc nn            : dc.b nn


  // bd nn            : dc.b nn


  // be nn            : dc.b nn


  // bf nn            : dc.b nn


  // c0 nn            : dc.b nn


  // c1 nn            : dc.b nn


  // c2 nn            : dc.b nn


  // c3 nn            : dc.b nn


  // c4 nn            : dc.b nn


  // c5 nn            : dc.b nn


  // c6 nn            : dc.b nn


  // c7 nn            : dc.b nn


  // c8 nn            : dc.b nn


  // c9 nn            : dc.b nn


  // ca nn            : dc.b nn


  // cb nn            : dc.b nn


  // cc nn            : dc.b nn


  // cd nn            : dc.b nn


  // ce nn            : dc.b nn


  // cf nn            : dc.b nn


  // d0 nn            : dc.b nn


  // d1 nn            : dc.b nn


  // d2 nn            : dc.b nn


  // d3 nn            : dc.b nn


  // d4 nn            : dc.b nn


  // d5 nn            : dc.b nn


  // d6 nn            : dc.b nn


  // d7 nn            : dc.b nn


  // d8 nn            : dc.b nn


  // d9 nn            : dc.b nn


  // da nn            : dc.b nn


  // db nn            : dc.b nn


  // dc nn            : dc.b nn


  // dd nn            : dc.b nn


  // de nn            : dc.b nn


  // df nn            : dc.b nn


  // e0               : cls


  // e0 nn            : dc.b nn


  // e1 nn            : dc.b nn


  // e2 nn            : dc.b nn


  // e3 nn            : dc.b nn


  // e4 nn            : dc.b nn


  // e5 nn            : dc.b nn


  // e6 nn            : dc.b nn


  // e7 nn            : dc.b nn


  // e8 nn            : dc.b nn


  // e9 nn            : dc.b nn


  // ea nn            : dc.b nn


  // eb nn            : dc.b nn


  // ec nn            : dc.b nn


  // ed nn            : dc.b nn


  // ee               : ret


  // ee nn            : dc.b nn


  // ef nn            : dc.b nn


  // f0 nn            : dc.b nn


  // f1 nn            : dc.b nn


  // f2 nn            : dc.b nn


  // f3 nn            : dc.b nn


  // f4 nn            : dc.b nn


  // f5 nn            : dc.b nn


  // f6 nn            : dc.b nn


  // f7 nn            : dc.b nn


  // f8 nn            : dc.b nn


  // f9 nn            : dc.b nn


  // fa nn            : dc.b nn


  // fb nn            : dc.b nn


  // fc nn            : dc.b nn


  // fd nn            : dc.b nn


  // fe nn            : dc.b nn


  // ff nn            : dc.b nn


  // 00 nnnnnn        : drw @r, v0, n


  // 01 nnnnnn        : drw @r, v0, n


  // 02 nnnnnn        : drw @r, v0, n


  // 03 nnnnnn        : drw @r, v0, n


  // 04 nnnnnn        : drw @r, v0, n


  // 05 nnnnnn        : drw @r, v0, n


  // 06 nnnnnn        : drw @r, v0, n


  // 07 nnnnnn        : drw @r, v0, n


  // 08 nnnnnn        : drw @r, v0, n


  // 09 nnnnnn        : drw @r, v0, n


  // 0a nnnnnn        : drw @r, v0, n


  // 0b nnnnnn        : drw @r, v0, n


  // 0c nnnnnn        : drw @r, v0, n


  // 0d nnnnnn        : drw @r, v0, n


  // 0e nnnnnn        : drw @r, v0, n


  // 0f nnnnnn        : drw @r, v0, n


  // 10 nnnnnn        : drw @r, v1, n


  // 11 nnnnnn        : drw @r, v1, n


  // 12 nnnnnn        : drw @r, v1, n


  // 13 nnnnnn        : drw @r, v1, n


  // 14 nnnnnn        : drw @r, v1, n


  // 15 nnnnnn        : drw @r, v1, n


  // 16 nnnnnn        : drw @r, v1, n


  // 17 nnnnnn        : drw @r, v1, n


  // 18 nnnnnn        : drw @r, v1, n


  // 19 nnnnnn        : drw @r, v1, n


  // 1a nnnnnn        : drw @r, v1, n


  // 1b nnnnnn        : drw @r, v1, n


  // 1c nnnnnn        : drw @r, v1, n


  // 1d nnnnnn        : drw @r, v1, n


  // 1e nnnnnn        : drw @r, v1, n


  // 1f nnnnnn        : drw @r, v1, n


  // 20 nnnnnn        : drw @r, v2, n


  // 21 nnnnnn        : drw @r, v2, n


  // 22 nnnnnn        : drw @r, v2, n


  // 23 nnnnnn        : drw @r, v2, n


  // 24 nnnnnn        : drw @r, v2, n


  // 25 nnnnnn        : drw @r, v2, n


  // 26 nnnnnn        : drw @r, v2, n


  // 27 nnnnnn        : drw @r, v2, n


  // 28 nnnnnn        : drw @r, v2, n


  // 29 nnnnnn        : drw @r, v2, n


  // 2a nnnnnn        : drw @r, v2, n


  // 2b nnnnnn        : drw @r, v2, n


  // 2c nnnnnn        : drw @r, v2, n


  // 2d nnnnnn        : drw @r, v2, n


  // 2e nnnnnn        : drw @r, v2, n


  // 2f nnnnnn        : drw @r, v2, n


  // 30 nnnnnn        : drw @r, v3, n


  // 31 nnnnnn        : drw @r, v3, n


  // 32 nnnnnn        : drw @r, v3, n


  // 33 nnnnnn        : drw @r, v3, n


  // 34 nnnnnn        : drw @r, v3, n


  // 35 nnnnnn        : drw @r, v3, n


  // 36 nnnnnn        : drw @r, v3, n


  // 37 nnnnnn        : drw @r, v3, n


  // 38 nnnnnn        : drw @r, v3, n


  // 39 nnnnnn        : drw @r, v3, n


  // 3a nnnnnn        : drw @r, v3, n


  // 3b nnnnnn        : drw @r, v3, n


  // 3c nnnnnn        : drw @r, v3, n


  // 3d nnnnnn        : drw @r, v3, n


  // 3e nnnnnn        : drw @r, v3, n


  // 3f nnnnnn        : drw @r, v3, n


  // 40 nnnnnn        : drw @r, v4, n


  // 41 nnnnnn        : drw @r, v4, n


  // 42 nnnnnn        : drw @r, v4, n


  // 43 nnnnnn        : drw @r, v4, n


  // 44 nnnnnn        : drw @r, v4, n


  // 45 nnnnnn        : drw @r, v4, n


  // 46 nnnnnn        : drw @r, v4, n


  // 47 nnnnnn        : drw @r, v4, n


  // 48 nnnnnn        : drw @r, v4, n


  // 49 nnnnnn        : drw @r, v4, n


  // 4a nnnnnn        : drw @r, v4, n


  // 4b nnnnnn        : drw @r, v4, n


  // 4c nnnnnn        : drw @r, v4, n


  // 4d nnnnnn        : drw @r, v4, n


  // 4e nnnnnn        : drw @r, v4, n


  // 4f nnnnnn        : drw @r, v4, n


  // 50 nnnnnn        : drw @r, v5, n


  // 51 nnnnnn        : drw @r, v5, n


  // 52 nnnnnn        : drw @r, v5, n


  // 53 nnnnnn        : drw @r, v5, n


  // 54 nnnnnn        : drw @r, v5, n


  // 55 nnnnnn        : drw @r, v5, n


  // 56 nnnnnn        : drw @r, v5, n


  // 57 nnnnnn        : drw @r, v5, n


  // 58 nnnnnn        : drw @r, v5, n


  // 59 nnnnnn        : drw @r, v5, n


  // 5a nnnnnn        : drw @r, v5, n


  // 5b nnnnnn        : drw @r, v5, n


  // 5c nnnnnn        : drw @r, v5, n


  // 5d nnnnnn        : drw @r, v5, n


  // 5e nnnnnn        : drw @r, v5, n


  // 5f nnnnnn        : drw @r, v5, n


  // 60 nnnnnn        : drw @r, v6, n


  // 61 nnnnnn        : drw @r, v6, n


  // 62 nnnnnn        : drw @r, v6, n


  // 63 nnnnnn        : drw @r, v6, n


  // 64 nnnnnn        : drw @r, v6, n


  // 65 nnnnnn        : drw @r, v6, n


  // 66 nnnnnn        : drw @r, v6, n


  // 67 nnnnnn        : drw @r, v6, n


  // 68 nnnnnn        : drw @r, v6, n


  // 69 nnnnnn        : drw @r, v6, n


  // 6a nnnnnn        : drw @r, v6, n


  // 6b nnnnnn        : drw @r, v6, n


  // 6c nnnnnn        : drw @r, v6, n


  // 6d nnnnnn        : drw @r, v6, n


  // 6e nnnnnn        : drw @r, v6, n


  // 6f nnnnnn        : drw @r, v6, n


  // 70 nnnnnn        : drw @r, v7, n


  // 71 nnnnnn        : drw @r, v7, n


  // 72 nnnnnn        : drw @r, v7, n


  // 73 nnnnnn        : drw @r, v7, n


  // 74 nnnnnn        : drw @r, v7, n


  // 75 nnnnnn        : drw @r, v7, n


  // 76 nnnnnn        : drw @r, v7, n


  // 77 nnnnnn        : drw @r, v7, n


  // 78 nnnnnn        : drw @r, v7, n


  // 79 nnnnnn        : drw @r, v7, n


  // 7a nnnnnn        : drw @r, v7, n


  // 7b nnnnnn        : drw @r, v7, n


  // 7c nnnnnn        : drw @r, v7, n


  // 7d nnnnnn        : drw @r, v7, n


  // 7e nnnnnn        : drw @r, v7, n


  // 7f nnnnnn        : drw @r, v7, n


  // 80 nnnnnn        : drw @r, v8, n


  // 81 nnnnnn        : drw @r, v8, n


  // 82 nnnnnn        : drw @r, v8, n


  // 83 nnnnnn        : drw @r, v8, n


  // 84 nnnnnn        : drw @r, v8, n


  // 85 nnnnnn        : drw @r, v8, n


  // 86 nnnnnn        : drw @r, v8, n


  // 87 nnnnnn        : drw @r, v8, n


  // 88 nnnnnn        : drw @r, v8, n


  // 89 nnnnnn        : drw @r, v8, n


  // 8a nnnnnn        : drw @r, v8, n


  // 8b nnnnnn        : drw @r, v8, n


  // 8c nnnnnn        : drw @r, v8, n


  // 8d nnnnnn        : drw @r, v8, n


  // 8e nnnnnn        : drw @r, v8, n


  // 8f nnnnnn        : drw @r, v8, n


  // 90 nnnnnn        : drw @r, v9, n


  // 91 nnnnnn        : drw @r, v9, n


  // 92 nnnnnn        : drw @r, v9, n


  // 93 nnnnnn        : drw @r, v9, n


  // 94 nnnnnn        : drw @r, v9, n


  // 95 nnnnnn        : drw @r, v9, n


  // 96 nnnnnn        : drw @r, v9, n


  // 97 nnnnnn        : drw @r, v9, n


  // 98 nnnnnn        : drw @r, v9, n


  // 99 nnnnnn        : drw @r, v9, n


  // 9a nnnnnn        : drw @r, v9, n


  // 9b nnnnnn        : drw @r, v9, n


  // 9c nnnnnn        : drw @r, v9, n


  // 9d nnnnnn        : drw @r, v9, n


  // 9e nnnnnn        : drw @r, v9, n


  // 9f nnnnnn        : drw @r, v9, n


  // a0 nnnnnn        : drw @r, va, n


  // a1 nnnnnn        : drw @r, va, n


  // a2 nnnnnn        : drw @r, va, n


  // a3 nnnnnn        : drw @r, va, n


  // a4 nnnnnn        : drw @r, va, n


  // a5 nnnnnn        : drw @r, va, n


  // a6 nnnnnn        : drw @r, va, n


  // a7 nnnnnn        : drw @r, va, n


  // a8 nnnnnn        : drw @r, va, n


  // a9 nnnnnn        : drw @r, va, n


  // aa nnnnnn        : drw @r, va, n


  // ab nnnnnn        : drw @r, va, n


  // ac nnnnnn        : drw @r, va, n


  // ad nnnnnn        : drw @r, va, n


  // ae nnnnnn        : drw @r, va, n


  // af nnnnnn        : drw @r, va, n


  // b0 nnnnnn        : drw @r, vb, n


  // b1 nnnnnn        : drw @r, vb, n


  // b2 nnnnnn        : drw @r, vb, n


  // b3 nnnnnn        : drw @r, vb, n


  // b4 nnnnnn        : drw @r, vb, n


  // b5 nnnnnn        : drw @r, vb, n


  // b6 nnnnnn        : drw @r, vb, n


  // b7 nnnnnn        : drw @r, vb, n


  // b8 nnnnnn        : drw @r, vb, n


  // b9 nnnnnn        : drw @r, vb, n


  // ba nnnnnn        : drw @r, vb, n


  // bb nnnnnn        : drw @r, vb, n


  // bc nnnnnn        : drw @r, vb, n


  // bd nnnnnn        : drw @r, vb, n


  // be nnnnnn        : drw @r, vb, n


  // bf nnnnnn        : drw @r, vb, n


  // c0 nnnnnn        : drw @r, vc, n


  // c1 nnnnnn        : drw @r, vc, n


  // c2 nnnnnn        : drw @r, vc, n


  // c3 nnnnnn        : drw @r, vc, n


  // c4 nnnnnn        : drw @r, vc, n


  // c5 nnnnnn        : drw @r, vc, n


  // c6 nnnnnn        : drw @r, vc, n


  // c7 nnnnnn        : drw @r, vc, n


  // c8 nnnnnn        : drw @r, vc, n


  // c9 nnnnnn        : drw @r, vc, n


  // ca nnnnnn        : drw @r, vc, n


  // cb nnnnnn        : drw @r, vc, n


  // cc nnnnnn        : drw @r, vc, n


  // cd nnnnnn        : drw @r, vc, n


  // ce nnnnnn        : drw @r, vc, n


  // cf nnnnnn        : drw @r, vc, n


  // d0 nnnnnn        : drw @r, vd, n


  // d1 nnnnnn        : drw @r, vd, n


  // d2 nnnnnn        : drw @r, vd, n


  // d3 nnnnnn        : drw @r, vd, n


  // d4 nnnnnn        : drw @r, vd, n


  // d5 nnnnnn        : drw @r, vd, n


  // d6 nnnnnn        : drw @r, vd, n


  // d7 nnnnnn        : drw @r, vd, n


  // d8 nnnnnn        : drw @r, vd, n


  // d9 nnnnnn        : drw @r, vd, n


  // da nnnnnn        : drw @r, vd, n


  // db nnnnnn        : drw @r, vd, n


  // dc nnnnnn        : drw @r, vd, n


  // dd nnnnnn        : drw @r, vd, n


  // de nnnnnn        : drw @r, vd, n


  // df nnnnnn        : drw @r, vd, n


  // e0 nnnnnn        : drw @r, ve, n


  // e1 nnnnnn        : drw @r, ve, n


  // e2 nnnnnn        : drw @r, ve, n


  // e3 nnnnnn        : drw @r, ve, n


  // e4 nnnnnn        : drw @r, ve, n


  // e5 nnnnnn        : drw @r, ve, n


  // e6 nnnnnn        : drw @r, ve, n


  // e7 nnnnnn        : drw @r, ve, n


  // e8 nnnnnn        : drw @r, ve, n


  // e9 nnnnnn        : drw @r, ve, n


  // ea nnnnnn        : drw @r, ve, n


  // eb nnnnnn        : drw @r, ve, n


  // ec nnnnnn        : drw @r, ve, n


  // ed nnnnnn        : drw @r, ve, n


  // ee nnnnnn        : drw @r, ve, n


  // ef nnnnnn        : drw @r, ve, n


  // f0 nnnnnn        : drw @r, vf, n


  // f1 nnnnnn        : drw @r, vf, n


  // f2 nnnnnn        : drw @r, vf, n


  // f3 nnnnnn        : drw @r, vf, n


  // f4 nnnnnn        : drw @r, vf, n


  // f5 nnnnnn        : drw @r, vf, n


  // f6 nnnnnn        : drw @r, vf, n


  // f7 nnnnnn        : drw @r, vf, n


  // f8 nnnnnn        : drw @r, vf, n


  // f9 nnnnnn        : drw @r, vf, n


  // fa nnnnnn        : drw @r, vf, n


  // fb nnnnnn        : drw @r, vf, n


  // fc nnnnnn        : drw @r, vf, n


  // fd nnnnnn        : drw @r, vf, n


  // fe nnnnnn        : drw @r, vf, n


  // ff nnnnnn        : drw @r, vf, n


  // 00               : store @r, v0


  // 00 nn            : dc.b nn


  // 01               : or @r, v0


  // 01 nn            : dc.b nn


  // 02               : and @r, v0


  // 02 nn            : dc.b nn


  // 03               : xor @r, v0


  // 03 nn            : dc.b nn


  // 04               : addc @r, v0      sz-h-vpn*


  // 04 nn            : dc.b nn


  // 05               : subc @r, v0      sz-h-vpn*


  // 05 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // 06               : shr @r, v0       sz-h-vpn*


  // 06 nn            : dc.b nn


  // 07               : subn @r, v0      sz-h-vpn*


  // 07 nn            : dc.b nn


  // 08 nn            : dc.b nn


  // 09 nn            : dc.b nn


  // 0a nn            : dc.b nn


  // 0b nn            : dc.b nn


  // 0c nn            : dc.b nn


  // 0d nn            : dc.b nn


  // 0e               : shl @r, v0       sz-h-vpn*


  // 0e nn            : dc.b nn


  // 0f nn            : dc.b nn


  // 10               : store @r, v1


  // 10 nn            : dc.b nn


  // 11               : or @r, v1


  // 11 nn            : dc.b nn


  // 12               : and @r, v1


  // 12 nn            : dc.b nn


  // 13               : xor @r, v1


  // 13 nn            : dc.b nn


  // 14               : addc @r, v1      sz-h-vpn*


  // 14 nn            : dc.b nn


  // 15               : subc @r, v1      sz-h-vpn*


  // 15 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // 16               : shr @r, v1       sz-h-vpn*


  // 16 nn            : dc.b nn


  // 17               : subn @r, v1      sz-h-vpn*


  // 17 nn            : dc.b nn


  // 18 nn            : dc.b nn


  // 19 nn            : dc.b nn


  // 1a nn            : dc.b nn


  // 1b nn            : dc.b nn


  // 1c nn            : dc.b nn


  // 1d nn            : dc.b nn


  // 1e               : shl @r, v1       sz-h-vpn*


  // 1e nn            : dc.b nn


  // 1f nn            : dc.b nn


  // 20               : store @r, v2


  // 20 nn            : dc.b nn


  // 21               : or @r, v2


  // 21 nn            : dc.b nn


  // 22               : and @r, v2


  // 22 nn            : dc.b nn


  // 23               : xor @r, v2


  // 23 nn            : dc.b nn


  // 24               : addc @r, v2      sz-h-vpn*


  // 24 nn            : dc.b nn


  // 25               : subc @r, v2      sz-h-vpn*


  // 25 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // 26               : shr @r, v2       sz-h-vpn*


  // 26 nn            : dc.b nn


  // 27               : subn @r, v2      sz-h-vpn*


  // 27 nn            : dc.b nn


  // 28 nn            : dc.b nn


  // 29 nn            : dc.b nn


  // 2a nn            : dc.b nn


  // 2b nn            : dc.b nn


  // 2c nn            : dc.b nn


  // 2d nn            : dc.b nn


  // 2e               : shl @r, v2       sz-h-vpn*


  // 2e nn            : dc.b nn


  // 2f nn            : dc.b nn


  // 30               : store @r, v3


  // 30 nn            : dc.b nn


  // 31               : or @r, v3


  // 31 nn            : dc.b nn


  // 32               : and @r, v3


  // 32 nn            : dc.b nn


  // 33               : xor @r, v3


  // 33 nn            : dc.b nn


  // 34               : addc @r, v3      sz-h-vpn*


  // 34 nn            : dc.b nn


  // 35               : subc @r, v3      sz-h-vpn*


  // 35 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // 36               : shr @r, v3       sz-h-vpn*


  // 36 nn            : dc.b nn


  // 37               : subn @r, v3      sz-h-vpn*


  // 37 nn            : dc.b nn


  // 38 nn            : dc.b nn


  // 39 nn            : dc.b nn


  // 3a nn            : dc.b nn


  // 3b nn            : dc.b nn


  // 3c nn            : dc.b nn


  // 3d nn            : dc.b nn


  // 3e               : shl @r, v3       sz-h-vpn*


  // 3e nn            : dc.b nn


  // 3f nn            : dc.b nn


  // 40               : store @r, v4


  // 40 nn            : dc.b nn


  // 41               : or @r, v4


  // 41 nn            : dc.b nn


  // 42               : and @r, v4


  // 42 nn            : dc.b nn


  // 43               : xor @r, v4


  // 43 nn            : dc.b nn


  // 44               : addc @r, v4      sz-h-vpn*


  // 44 nn            : dc.b nn


  // 45               : subc @r, v4      sz-h-vpn*


  // 45 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // 46               : shr @r, v4       sz-h-vpn*


  // 46 nn            : dc.b nn


  // 47               : subn @r, v4      sz-h-vpn*


  // 47 nn            : dc.b nn


  // 48 nn            : dc.b nn


  // 49 nn            : dc.b nn


  // 4a nn            : dc.b nn


  // 4b nn            : dc.b nn


  // 4c nn            : dc.b nn


  // 4d nn            : dc.b nn


  // 4e               : shl @r, v4       sz-h-vpn*


  // 4e nn            : dc.b nn


  // 4f nn            : dc.b nn


  // 50               : store @r, v5


  // 50 nn            : dc.b nn


  // 51               : or @r, v5


  // 51 nn            : dc.b nn


  // 52               : and @r, v5


  // 52 nn            : dc.b nn


  // 53               : xor @r, v5


  // 53 nn            : dc.b nn


  // 54               : addc @r, v5      sz-h-vpn*


  // 54 nn            : dc.b nn


  // 55               : subc @r, v5      sz-h-vpn*


  // 55 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // 56               : shr @r, v5       sz-h-vpn*


  // 56 nn            : dc.b nn


  // 57               : subn @r, v5      sz-h-vpn*


  // 57 nn            : dc.b nn


  // 58 nn            : dc.b nn


  // 59 nn            : dc.b nn


  // 5a nn            : dc.b nn


  // 5b nn            : dc.b nn


  // 5c nn            : dc.b nn


  // 5d nn            : dc.b nn


  // 5e               : shl @r, v5       sz-h-vpn*


  // 5e nn            : dc.b nn


  // 5f nn            : dc.b nn


  // 60               : store @r, v6


  // 60 nn            : dc.b nn


  // 61               : or @r, v6


  // 61 nn            : dc.b nn


  // 62               : and @r, v6


  // 62 nn            : dc.b nn


  // 63               : xor @r, v6


  // 63 nn            : dc.b nn


  // 64               : addc @r, v6      sz-h-vpn*


  // 64 nn            : dc.b nn


  // 65               : subc @r, v6      sz-h-vpn*


  // 65 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // 66               : shr @r, v6       sz-h-vpn*


  // 66 nn            : dc.b nn


  // 67               : subn @r, v6      sz-h-vpn*


  // 67 nn            : dc.b nn


  // 68 nn            : dc.b nn


  // 69 nn            : dc.b nn


  // 6a nn            : dc.b nn


  // 6b nn            : dc.b nn


  // 6c nn            : dc.b nn


  // 6d nn            : dc.b nn


  // 6e               : shl @r, v6       sz-h-vpn*


  // 6e nn            : dc.b nn


  // 6f nn            : dc.b nn


  // 70               : store @r, v7


  // 70 nn            : dc.b nn


  // 71               : or @r, v7


  // 71 nn            : dc.b nn


  // 72               : and @r, v7


  // 72 nn            : dc.b nn


  // 73               : xor @r, v7


  // 73 nn            : dc.b nn


  // 74               : addc @r, v7      sz-h-vpn*


  // 74 nn            : dc.b nn


  // 75               : subc @r, v7      sz-h-vpn*


  // 75 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // 76               : shr @r, v7       sz-h-vpn*


  // 76 nn            : dc.b nn


  // 77               : subn @r, v7      sz-h-vpn*


  // 77 nn            : dc.b nn


  // 78 nn            : dc.b nn


  // 79 nn            : dc.b nn


  // 7a nn            : dc.b nn


  // 7b nn            : dc.b nn


  // 7c nn            : dc.b nn


  // 7d nn            : dc.b nn


  // 7e               : shl @r, v7       sz-h-vpn*


  // 7e nn            : dc.b nn


  // 7f nn            : dc.b nn


  // 80               : store @r, v8


  // 80 nn            : dc.b nn


  // 81               : or @r, v8


  // 81 nn            : dc.b nn


  // 82               : and @r, v8


  // 82 nn            : dc.b nn


  // 83               : xor @r, v8


  // 83 nn            : dc.b nn


  // 84               : addc @r, v8      sz-h-vpn*


  // 84 nn            : dc.b nn


  // 85               : subc @r, v8      sz-h-vpn*


  // 85 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // 86               : shr @r, v8       sz-h-vpn*


  // 86 nn            : dc.b nn


  // 87               : subn @r, v8      sz-h-vpn*


  // 87 nn            : dc.b nn


  // 88 nn            : dc.b nn


  // 89 nn            : dc.b nn


  // 8a nn            : dc.b nn


  // 8b nn            : dc.b nn


  // 8c nn            : dc.b nn


  // 8d nn            : dc.b nn


  // 8e               : shl @r, v8       sz-h-vpn*


  // 8e nn            : dc.b nn


  // 8f nn            : dc.b nn


  // 90               : store @r, v9


  // 90 nn            : dc.b nn


  // 91               : or @r, v9


  // 91 nn            : dc.b nn


  // 92               : and @r, v9


  // 92 nn            : dc.b nn


  // 93               : xor @r, v9


  // 93 nn            : dc.b nn


  // 94               : addc @r, v9      sz-h-vpn*


  // 94 nn            : dc.b nn


  // 95               : subc @r, v9      sz-h-vpn*


  // 95 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // 96               : shr @r, v9       sz-h-vpn*


  // 96 nn            : dc.b nn


  // 97               : subn @r, v9      sz-h-vpn*


  // 97 nn            : dc.b nn


  // 98 nn            : dc.b nn


  // 99 nn            : dc.b nn


  // 9a nn            : dc.b nn


  // 9b nn            : dc.b nn


  // 9c nn            : dc.b nn


  // 9d nn            : dc.b nn


  // 9e               : shl @r, v9       sz-h-vpn*


  // 9e nn            : dc.b nn


  // 9f nn            : dc.b nn


  // a0               : store @r, va


  // a0 nn            : dc.b nn


  // a1               : or @r, va


  // a1 nn            : dc.b nn


  // a2               : and @r, va


  // a2 nn            : dc.b nn


  // a3               : xor @r, va


  // a3 nn            : dc.b nn


  // a4               : addc @r, va      sz-h-vpn*


  // a4 nn            : dc.b nn


  // a5               : subc @r, va      sz-h-vpn*


  // a5 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // a6               : shr @r, va       sz-h-vpn*


  // a6 nn            : dc.b nn


  // a7               : subn @r, va      sz-h-vpn*


  // a7 nn            : dc.b nn


  // a8 nn            : dc.b nn


  // a9 nn            : dc.b nn


  // aa nn            : dc.b nn


  // ab nn            : dc.b nn


  // ac nn            : dc.b nn


  // ad nn            : dc.b nn


  // ae               : shl @r, va       sz-h-vpn*


  // ae nn            : dc.b nn


  // af nn            : dc.b nn


  // b0               : store @r, vb


  // b0 nn            : dc.b nn


  // b1               : or @r, vb


  // b1 nn            : dc.b nn


  // b2               : and @r, vb


  // b2 nn            : dc.b nn


  // b3               : xor @r, vb


  // b3 nn            : dc.b nn


  // b4               : addc @r, vb      sz-h-vpn*


  // b4 nn            : dc.b nn


  // b5               : subc @r, vb      sz-h-vpn*


  // b5 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // b6               : shr @r, vb       sz-h-vpn*


  // b6 nn            : dc.b nn


  // b7               : subn @r, vb      sz-h-vpn*


  // b7 nn            : dc.b nn


  // b8 nn            : dc.b nn


  // b9 nn            : dc.b nn


  // ba nn            : dc.b nn


  // bb nn            : dc.b nn


  // bc nn            : dc.b nn


  // bd nn            : dc.b nn


  // be               : shl @r, vb       sz-h-vpn*


  // be nn            : dc.b nn


  // bf nn            : dc.b nn


  // c0               : store @r, vc


  // c0 nn            : dc.b nn


  // c1               : or @r, vc


  // c1 nn            : dc.b nn


  // c2               : and @r, vc


  // c2 nn            : dc.b nn


  // c3               : xor @r, vc


  // c3 nn            : dc.b nn


  // c4               : addc @r, vc      sz-h-vpn*


  // c4 nn            : dc.b nn


  // c5               : subc @r, vc      sz-h-vpn*


  // c5 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // c6               : shr @r, vc       sz-h-vpn*


  // c6 nn            : dc.b nn


  // c7               : subn @r, vc      sz-h-vpn*


  // c7 nn            : dc.b nn


  // c8 nn            : dc.b nn


  // c9 nn            : dc.b nn


  // ca nn            : dc.b nn


  // cb nn            : dc.b nn


  // cc nn            : dc.b nn


  // cd nn            : dc.b nn


  // ce               : shl @r, vc       sz-h-vpn*


  // ce nn            : dc.b nn


  // cf nn            : dc.b nn


  // d0               : store @r, vd


  // d0 nn            : dc.b nn


  // d1               : or @r, vd


  // d1 nn            : dc.b nn


  // d2               : and @r, vd


  // d2 nn            : dc.b nn


  // d3               : xor @r, vd


  // d3 nn            : dc.b nn


  // d4               : addc @r, vd      sz-h-vpn*


  // d4 nn            : dc.b nn


  // d5               : subc @r, vd      sz-h-vpn*


  // d5 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // d6               : shr @r, vd       sz-h-vpn*


  // d6 nn            : dc.b nn


  // d7               : subn @r, vd      sz-h-vpn*


  // d7 nn            : dc.b nn


  // d8 nn            : dc.b nn


  // d9 nn            : dc.b nn


  // da nn            : dc.b nn


  // db nn            : dc.b nn


  // dc nn            : dc.b nn


  // dd nn            : dc.b nn


  // de               : shl @r, vd       sz-h-vpn*


  // de nn            : dc.b nn


  // df nn            : dc.b nn


  // e0               : store @r, ve


  // e0 nn            : dc.b nn


  // e1               : or @r, ve


  // e1 nn            : dc.b nn


  // e2               : and @r, ve


  // e2 nn            : dc.b nn


  // e3               : xor @r, ve


  // e3 nn            : dc.b nn


  // e4               : addc @r, ve      sz-h-vpn*


  // e4 nn            : dc.b nn


  // e5               : subc @r, ve      sz-h-vpn*


  // e5 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // e6               : shr @r, ve       sz-h-vpn*


  // e6 nn            : dc.b nn


  // e7               : subn @r, ve      sz-h-vpn*


  // e7 nn            : dc.b nn


  // e8 nn            : dc.b nn


  // e9 nn            : dc.b nn


  // ea nn            : dc.b nn


  // eb nn            : dc.b nn


  // ec nn            : dc.b nn


  // ed nn            : dc.b nn


  // ee               : shl @r, ve       sz-h-vpn*


  // ee nn            : dc.b nn


  // ef nn            : dc.b nn


  // f0               : store @r, vf


  // f0 nn            : dc.b nn


  // f1               : or @r, vf


  // f1 nn            : dc.b nn


  // f2               : and @r, vf


  // f2 nn            : dc.b nn


  // f3               : xor @r, vf


  // f3 nn            : dc.b nn


  // f4               : addc @r, vf      sz-h-vpn*


  // f4 nn            : dc.b nn


  // f5               : subc @r, vf      sz-h-vpn*


  // f5 nn            : dc.b nn

  // Reference:  page 
  // Reference: The docs suggest that we should shift with @s, but the existing implentations don't. We follow what works, and mimic other peoples codes.

  // f6               : shr @r, vf       sz-h-vpn*


  // f6 nn            : dc.b nn


  // f7               : subn @r, vf      sz-h-vpn*


  // f7 nn            : dc.b nn


  // f8 nn            : dc.b nn


  // f9 nn            : dc.b nn


  // fa nn            : dc.b nn


  // fb nn            : dc.b nn


  // fc nn            : dc.b nn


  // fd nn            : dc.b nn


  // fe               : shl @r, vf       sz-h-vpn*


  // fe nn            : dc.b nn


  // ff nn            : dc.b nn


  // 00               : skpeq @r, v0


  // 00 nn            : dc.b nn


  // 01 nn            : dc.b nn


  // 02 nn            : dc.b nn


  // 03 nn            : dc.b nn


  // 04 nn            : dc.b nn


  // 05 nn            : dc.b nn


  // 06 nn            : dc.b nn


  // 07 nn            : dc.b nn


  // 08 nn            : dc.b nn


  // 09 nn            : dc.b nn


  // 0a nn            : dc.b nn


  // 0b nn            : dc.b nn


  // 0c nn            : dc.b nn


  // 0d nn            : dc.b nn


  // 0e nn            : dc.b nn


  // 0f nn            : dc.b nn


  // 10               : skpeq @r, v1


  // 10 nn            : dc.b nn


  // 11 nn            : dc.b nn


  // 12 nn            : dc.b nn


  // 13 nn            : dc.b nn


  // 14 nn            : dc.b nn


  // 15 nn            : dc.b nn


  // 16 nn            : dc.b nn


  // 17 nn            : dc.b nn


  // 18 nn            : dc.b nn


  // 19 nn            : dc.b nn


  // 1a nn            : dc.b nn


  // 1b nn            : dc.b nn


  // 1c nn            : dc.b nn


  // 1d nn            : dc.b nn


  // 1e nn            : dc.b nn


  // 1f nn            : dc.b nn


  // 20               : skpeq @r, v2


  // 20 nn            : dc.b nn


  // 21 nn            : dc.b nn


  // 22 nn            : dc.b nn


  // 23 nn            : dc.b nn


  // 24 nn            : dc.b nn


  // 25 nn            : dc.b nn


  // 26 nn            : dc.b nn


  // 27 nn            : dc.b nn


  // 28 nn            : dc.b nn


  // 29 nn            : dc.b nn


  // 2a nn            : dc.b nn


  // 2b nn            : dc.b nn


  // 2c nn            : dc.b nn


  // 2d nn            : dc.b nn


  // 2e nn            : dc.b nn


  // 2f nn            : dc.b nn


  // 30               : skpeq @r, v3


  // 30 nn            : dc.b nn


  // 31 nn            : dc.b nn


  // 32 nn            : dc.b nn


  // 33 nn            : dc.b nn


  // 34 nn            : dc.b nn


  // 35 nn            : dc.b nn


  // 36 nn            : dc.b nn


  // 37 nn            : dc.b nn


  // 38 nn            : dc.b nn


  // 39 nn            : dc.b nn


  // 3a nn            : dc.b nn


  // 3b nn            : dc.b nn


  // 3c nn            : dc.b nn


  // 3d nn            : dc.b nn


  // 3e nn            : dc.b nn


  // 3f nn            : dc.b nn


  // 40               : skpeq @r, v4


  // 40 nn            : dc.b nn


  // 41 nn            : dc.b nn


  // 42 nn            : dc.b nn


  // 43 nn            : dc.b nn


  // 44 nn            : dc.b nn


  // 45 nn            : dc.b nn


  // 46 nn            : dc.b nn


  // 47 nn            : dc.b nn


  // 48 nn            : dc.b nn


  // 49 nn            : dc.b nn


  // 4a nn            : dc.b nn


  // 4b nn            : dc.b nn


  // 4c nn            : dc.b nn


  // 4d nn            : dc.b nn


  // 4e nn            : dc.b nn


  // 4f nn            : dc.b nn


  // 50               : skpeq @r, v5


  // 50 nn            : dc.b nn


  // 51 nn            : dc.b nn


  // 52 nn            : dc.b nn


  // 53 nn            : dc.b nn


  // 54 nn            : dc.b nn


  // 55 nn            : dc.b nn


  // 56 nn            : dc.b nn


  // 57 nn            : dc.b nn


  // 58 nn            : dc.b nn


  // 59 nn            : dc.b nn


  // 5a nn            : dc.b nn


  // 5b nn            : dc.b nn


  // 5c nn            : dc.b nn


  // 5d nn            : dc.b nn


  // 5e nn            : dc.b nn


  // 5f nn            : dc.b nn


  // 60               : skpeq @r, v6


  // 60 nn            : dc.b nn


  // 61 nn            : dc.b nn


  // 62 nn            : dc.b nn


  // 63 nn            : dc.b nn


  // 64 nn            : dc.b nn


  // 65 nn            : dc.b nn


  // 66 nn            : dc.b nn


  // 67 nn            : dc.b nn


  // 68 nn            : dc.b nn


  // 69 nn            : dc.b nn


  // 6a nn            : dc.b nn


  // 6b nn            : dc.b nn


  // 6c nn            : dc.b nn


  // 6d nn            : dc.b nn


  // 6e nn            : dc.b nn


  // 6f nn            : dc.b nn


  // 70               : skpeq @r, v7


  // 70 nn            : dc.b nn


  // 71 nn            : dc.b nn


  // 72 nn            : dc.b nn


  // 73 nn            : dc.b nn


  // 74 nn            : dc.b nn


  // 75 nn            : dc.b nn


  // 76 nn            : dc.b nn


  // 77 nn            : dc.b nn


  // 78 nn            : dc.b nn


  // 79 nn            : dc.b nn


  // 7a nn            : dc.b nn


  // 7b nn            : dc.b nn


  // 7c nn            : dc.b nn


  // 7d nn            : dc.b nn


  // 7e nn            : dc.b nn


  // 7f nn            : dc.b nn


  // 80               : skpeq @r, v8


  // 80 nn            : dc.b nn


  // 81 nn            : dc.b nn


  // 82 nn            : dc.b nn


  // 83 nn            : dc.b nn


  // 84 nn            : dc.b nn


  // 85 nn            : dc.b nn


  // 86 nn            : dc.b nn


  // 87 nn            : dc.b nn


  // 88 nn            : dc.b nn


  // 89 nn            : dc.b nn


  // 8a nn            : dc.b nn


  // 8b nn            : dc.b nn


  // 8c nn            : dc.b nn


  // 8d nn            : dc.b nn


  // 8e nn            : dc.b nn


  // 8f nn            : dc.b nn


  // 90               : skpeq @r, v9


  // 90 nn            : dc.b nn


  // 91 nn            : dc.b nn


  // 92 nn            : dc.b nn


  // 93 nn            : dc.b nn


  // 94 nn            : dc.b nn


  // 95 nn            : dc.b nn


  // 96 nn            : dc.b nn


  // 97 nn            : dc.b nn


  // 98 nn            : dc.b nn


  // 99 nn            : dc.b nn


  // 9a nn            : dc.b nn


  // 9b nn            : dc.b nn


  // 9c nn            : dc.b nn


  // 9d nn            : dc.b nn


  // 9e nn            : dc.b nn


  // 9f nn            : dc.b nn


  // a0               : skpeq @r, va


  // a0 nn            : dc.b nn


  // a1 nn            : dc.b nn


  // a2 nn            : dc.b nn


  // a3 nn            : dc.b nn


  // a4 nn            : dc.b nn


  // a5 nn            : dc.b nn


  // a6 nn            : dc.b nn


  // a7 nn            : dc.b nn


  // a8 nn            : dc.b nn


  // a9 nn            : dc.b nn


  // aa nn            : dc.b nn


  // ab nn            : dc.b nn


  // ac nn            : dc.b nn


  // ad nn            : dc.b nn


  // ae nn            : dc.b nn


  // af nn            : dc.b nn


  // b0               : skpeq @r, vb


  // b0 nn            : dc.b nn


  // b1 nn            : dc.b nn


  // b2 nn            : dc.b nn


  // b3 nn            : dc.b nn


  // b4 nn            : dc.b nn


  // b5 nn            : dc.b nn


  // b6 nn            : dc.b nn


  // b7 nn            : dc.b nn


  // b8 nn            : dc.b nn


  // b9 nn            : dc.b nn


  // ba nn            : dc.b nn


  // bb nn            : dc.b nn


  // bc nn            : dc.b nn


  // bd nn            : dc.b nn


  // be nn            : dc.b nn


  // bf nn            : dc.b nn


  // c0               : skpeq @r, vc


  // c0 nn            : dc.b nn


  // c1 nn            : dc.b nn


  // c2 nn            : dc.b nn


  // c3 nn            : dc.b nn


  // c4 nn            : dc.b nn


  // c5 nn            : dc.b nn


  // c6 nn            : dc.b nn


  // c7 nn            : dc.b nn


  // c8 nn            : dc.b nn


  // c9 nn            : dc.b nn


  // ca nn            : dc.b nn


  // cb nn            : dc.b nn


  // cc nn            : dc.b nn


  // cd nn            : dc.b nn


  // ce nn            : dc.b nn


  // cf nn            : dc.b nn


  // d0               : skpeq @r, vd


  // d0 nn            : dc.b nn


  // d1 nn            : dc.b nn


  // d2 nn            : dc.b nn


  // d3 nn            : dc.b nn


  // d4 nn            : dc.b nn


  // d5 nn            : dc.b nn


  // d6 nn            : dc.b nn


  // d7 nn            : dc.b nn


  // d8 nn            : dc.b nn


  // d9 nn            : dc.b nn


  // da nn            : dc.b nn


  // db nn            : dc.b nn


  // dc nn            : dc.b nn


  // dd nn            : dc.b nn


  // de nn            : dc.b nn


  // df nn            : dc.b nn


  // e0               : skpeq @r, ve


  // e0 nn            : dc.b nn


  // e1 nn            : dc.b nn


  // e2 nn            : dc.b nn


  // e3 nn            : dc.b nn


  // e4 nn            : dc.b nn


  // e5 nn            : dc.b nn


  // e6 nn            : dc.b nn


  // e7 nn            : dc.b nn


  // e8 nn            : dc.b nn


  // e9 nn            : dc.b nn


  // ea nn            : dc.b nn


  // eb nn            : dc.b nn


  // ec nn            : dc.b nn


  // ed nn            : dc.b nn


  // ee nn            : dc.b nn


  // ef nn            : dc.b nn


  // f0               : skpeq @r, vf


  // f0 nn            : dc.b nn


  // f1 nn            : dc.b nn


  // f2 nn            : dc.b nn


  // f3 nn            : dc.b nn


  // f4 nn            : dc.b nn


  // f5 nn            : dc.b nn


  // f6 nn            : dc.b nn


  // f7 nn            : dc.b nn


  // f8 nn            : dc.b nn


  // f9 nn            : dc.b nn


  // fa nn            : dc.b nn


  // fb nn            : dc.b nn


  // fc nn            : dc.b nn


  // fd nn            : dc.b nn


  // fe nn            : dc.b nn


  // ff nn            : dc.b nn


  // 00               : skpneq @r, v0


  // 00 nn            : dc.b nn


  // 01 nn            : dc.b nn


  // 02 nn            : dc.b nn


  // 03 nn            : dc.b nn


  // 04 nn            : dc.b nn


  // 05 nn            : dc.b nn


  // 06 nn            : dc.b nn


  // 07 nn            : dc.b nn


  // 08 nn            : dc.b nn


  // 09 nn            : dc.b nn


  // 0a nn            : dc.b nn


  // 0b nn            : dc.b nn


  // 0c nn            : dc.b nn


  // 0d nn            : dc.b nn


  // 0e nn            : dc.b nn


  // 0f nn            : dc.b nn


  // 10               : skpneq @r, v1


  // 10 nn            : dc.b nn


  // 11 nn            : dc.b nn


  // 12 nn            : dc.b nn


  // 13 nn            : dc.b nn


  // 14 nn            : dc.b nn


  // 15 nn            : dc.b nn


  // 16 nn            : dc.b nn


  // 17 nn            : dc.b nn


  // 18 nn            : dc.b nn


  // 19 nn            : dc.b nn


  // 1a nn            : dc.b nn


  // 1b nn            : dc.b nn


  // 1c nn            : dc.b nn


  // 1d nn            : dc.b nn


  // 1e nn            : dc.b nn


  // 1f nn            : dc.b nn


  // 20               : skpneq @r, v2


  // 20 nn            : dc.b nn


  // 21 nn            : dc.b nn


  // 22 nn            : dc.b nn


  // 23 nn            : dc.b nn


  // 24 nn            : dc.b nn


  // 25 nn            : dc.b nn


  // 26 nn            : dc.b nn


  // 27 nn            : dc.b nn


  // 28 nn            : dc.b nn


  // 29 nn            : dc.b nn


  // 2a nn            : dc.b nn


  // 2b nn            : dc.b nn


  // 2c nn            : dc.b nn


  // 2d nn            : dc.b nn


  // 2e nn            : dc.b nn


  // 2f nn            : dc.b nn


  // 30               : skpneq @r, v3


  // 30 nn            : dc.b nn


  // 31 nn            : dc.b nn


  // 32 nn            : dc.b nn


  // 33 nn            : dc.b nn


  // 34 nn            : dc.b nn


  // 35 nn            : dc.b nn


  // 36 nn            : dc.b nn


  // 37 nn            : dc.b nn


  // 38 nn            : dc.b nn


  // 39 nn            : dc.b nn


  // 3a nn            : dc.b nn


  // 3b nn            : dc.b nn


  // 3c nn            : dc.b nn


  // 3d nn            : dc.b nn


  // 3e nn            : dc.b nn


  // 3f nn            : dc.b nn


  // 40               : skpneq @r, v4


  // 40 nn            : dc.b nn


  // 41 nn            : dc.b nn


  // 42 nn            : dc.b nn


  // 43 nn            : dc.b nn


  // 44 nn            : dc.b nn


  // 45 nn            : dc.b nn


  // 46 nn            : dc.b nn


  // 47 nn            : dc.b nn


  // 48 nn            : dc.b nn


  // 49 nn            : dc.b nn


  // 4a nn            : dc.b nn


  // 4b nn            : dc.b nn


  // 4c nn            : dc.b nn


  // 4d nn            : dc.b nn


  // 4e nn            : dc.b nn


  // 4f nn            : dc.b nn


  // 50               : skpneq @r, v5


  // 50 nn            : dc.b nn


  // 51 nn            : dc.b nn


  // 52 nn            : dc.b nn


  // 53 nn            : dc.b nn


  // 54 nn            : dc.b nn


  // 55 nn            : dc.b nn


  // 56 nn            : dc.b nn


  // 57 nn            : dc.b nn


  // 58 nn            : dc.b nn


  // 59 nn            : dc.b nn


  // 5a nn            : dc.b nn


  // 5b nn            : dc.b nn


  // 5c nn            : dc.b nn


  // 5d nn            : dc.b nn


  // 5e nn            : dc.b nn


  // 5f nn            : dc.b nn


  // 60               : skpneq @r, v6


  // 60 nn            : dc.b nn


  // 61 nn            : dc.b nn


  // 62 nn            : dc.b nn


  // 63 nn            : dc.b nn


  // 64 nn            : dc.b nn


  // 65 nn            : dc.b nn


  // 66 nn            : dc.b nn


  // 67 nn            : dc.b nn


  // 68 nn            : dc.b nn


  // 69 nn            : dc.b nn


  // 6a nn            : dc.b nn


  // 6b nn            : dc.b nn


  // 6c nn            : dc.b nn


  // 6d nn            : dc.b nn


  // 6e nn            : dc.b nn


  // 6f nn            : dc.b nn


  // 70               : skpneq @r, v7


  // 70 nn            : dc.b nn


  // 71 nn            : dc.b nn


  // 72 nn            : dc.b nn


  // 73 nn            : dc.b nn


  // 74 nn            : dc.b nn


  // 75 nn            : dc.b nn


  // 76 nn            : dc.b nn


  // 77 nn            : dc.b nn


  // 78 nn            : dc.b nn


  // 79 nn            : dc.b nn


  // 7a nn            : dc.b nn


  // 7b nn            : dc.b nn


  // 7c nn            : dc.b nn


  // 7d nn            : dc.b nn


  // 7e nn            : dc.b nn


  // 7f nn            : dc.b nn


  // 80               : skpneq @r, v8


  // 80 nn            : dc.b nn


  // 81 nn            : dc.b nn


  // 82 nn            : dc.b nn


  // 83 nn            : dc.b nn


  // 84 nn            : dc.b nn


  // 85 nn            : dc.b nn


  // 86 nn            : dc.b nn


  // 87 nn            : dc.b nn


  // 88 nn            : dc.b nn


  // 89 nn            : dc.b nn


  // 8a nn            : dc.b nn


  // 8b nn            : dc.b nn


  // 8c nn            : dc.b nn


  // 8d nn            : dc.b nn


  // 8e nn            : dc.b nn


  // 8f nn            : dc.b nn


  // 90               : skpneq @r, v9


  // 90 nn            : dc.b nn


  // 91 nn            : dc.b nn


  // 92 nn            : dc.b nn


  // 93 nn            : dc.b nn


  // 94 nn            : dc.b nn


  // 95 nn            : dc.b nn


  // 96 nn            : dc.b nn


  // 97 nn            : dc.b nn


  // 98 nn            : dc.b nn


  // 99 nn            : dc.b nn


  // 9a nn            : dc.b nn


  // 9b nn            : dc.b nn


  // 9c nn            : dc.b nn


  // 9d nn            : dc.b nn


  // 9e nn            : dc.b nn


  // 9f nn            : dc.b nn


  // a0               : skpneq @r, va


  // a0 nn            : dc.b nn


  // a1 nn            : dc.b nn


  // a2 nn            : dc.b nn


  // a3 nn            : dc.b nn


  // a4 nn            : dc.b nn


  // a5 nn            : dc.b nn


  // a6 nn            : dc.b nn


  // a7 nn            : dc.b nn


  // a8 nn            : dc.b nn


  // a9 nn            : dc.b nn


  // aa nn            : dc.b nn


  // ab nn            : dc.b nn


  // ac nn            : dc.b nn


  // ad nn            : dc.b nn


  // ae nn            : dc.b nn


  // af nn            : dc.b nn


  // b0               : skpneq @r, vb


  // b0 nn            : dc.b nn


  // b1 nn            : dc.b nn


  // b2 nn            : dc.b nn


  // b3 nn            : dc.b nn


  // b4 nn            : dc.b nn


  // b5 nn            : dc.b nn


  // b6 nn            : dc.b nn


  // b7 nn            : dc.b nn


  // b8 nn            : dc.b nn


  // b9 nn            : dc.b nn


  // ba nn            : dc.b nn


  // bb nn            : dc.b nn


  // bc nn            : dc.b nn


  // bd nn            : dc.b nn


  // be nn            : dc.b nn


  // bf nn            : dc.b nn


  // c0               : skpneq @r, vc


  // c0 nn            : dc.b nn


  // c1 nn            : dc.b nn


  // c2 nn            : dc.b nn


  // c3 nn            : dc.b nn


  // c4 nn            : dc.b nn


  // c5 nn            : dc.b nn


  // c6 nn            : dc.b nn


  // c7 nn            : dc.b nn


  // c8 nn            : dc.b nn


  // c9 nn            : dc.b nn


  // ca nn            : dc.b nn


  // cb nn            : dc.b nn


  // cc nn            : dc.b nn


  // cd nn            : dc.b nn


  // ce nn            : dc.b nn


  // cf nn            : dc.b nn


  // d0               : skpneq @r, vd


  // d0 nn            : dc.b nn


  // d1 nn            : dc.b nn


  // d2 nn            : dc.b nn


  // d3 nn            : dc.b nn


  // d4 nn            : dc.b nn


  // d5 nn            : dc.b nn


  // d6 nn            : dc.b nn


  // d7 nn            : dc.b nn


  // d8 nn            : dc.b nn


  // d9 nn            : dc.b nn


  // da nn            : dc.b nn


  // db nn            : dc.b nn


  // dc nn            : dc.b nn


  // dd nn            : dc.b nn


  // de nn            : dc.b nn


  // df nn            : dc.b nn


  // e0               : skpneq @r, ve


  // e0 nn            : dc.b nn


  // e1 nn            : dc.b nn


  // e2 nn            : dc.b nn


  // e3 nn            : dc.b nn


  // e4 nn            : dc.b nn


  // e5 nn            : dc.b nn


  // e6 nn            : dc.b nn


  // e7 nn            : dc.b nn


  // e8 nn            : dc.b nn


  // e9 nn            : dc.b nn


  // ea nn            : dc.b nn


  // eb nn            : dc.b nn


  // ec nn            : dc.b nn


  // ed nn            : dc.b nn


  // ee nn            : dc.b nn


  // ef nn            : dc.b nn


  // f0               : skpneq @r, vf


  // f0 nn            : dc.b nn


  // f1 nn            : dc.b nn


  // f2 nn            : dc.b nn


  // f3 nn            : dc.b nn


  // f4 nn            : dc.b nn


  // f5 nn            : dc.b nn


  // f6 nn            : dc.b nn


  // f7 nn            : dc.b nn


  // f8 nn            : dc.b nn


  // f9 nn            : dc.b nn


  // fa nn            : dc.b nn


  // fb nn            : dc.b nn


  // fc nn            : dc.b nn


  // fd nn            : dc.b nn


  // fe nn            : dc.b nn


  // ff nn            : dc.b nn


  // 00 nn            : dc.b nn


  // 01 nn            : dc.b nn


  // 02 nn            : dc.b nn


  // 03 nn            : dc.b nn


  // 04 nn            : dc.b nn


  // 05 nn            : dc.b nn


  // 06 nn            : dc.b nn


  // 07 nn            : dc.b nn


  // 08 nn            : dc.b nn


  // 09 nn            : dc.b nn


  // 0a nn            : dc.b nn


  // 0b nn            : dc.b nn


  // 0c nn            : dc.b nn


  // 0d nn            : dc.b nn


  // 0e nn            : dc.b nn


  // 0f nn            : dc.b nn


  // 10 nn            : dc.b nn


  // 11 nn            : dc.b nn


  // 12 nn            : dc.b nn


  // 13 nn            : dc.b nn


  // 14 nn            : dc.b nn


  // 15 nn            : dc.b nn


  // 16 nn            : dc.b nn


  // 17 nn            : dc.b nn


  // 18 nn            : dc.b nn


  // 19 nn            : dc.b nn


  // 1a nn            : dc.b nn


  // 1b nn            : dc.b nn


  // 1c nn            : dc.b nn


  // 1d nn            : dc.b nn


  // 1e nn            : dc.b nn


  // 1f nn            : dc.b nn


  // 20 nn            : dc.b nn


  // 21 nn            : dc.b nn


  // 22 nn            : dc.b nn


  // 23 nn            : dc.b nn


  // 24 nn            : dc.b nn


  // 25 nn            : dc.b nn


  // 26 nn            : dc.b nn


  // 27 nn            : dc.b nn


  // 28 nn            : dc.b nn


  // 29 nn            : dc.b nn


  // 2a nn            : dc.b nn


  // 2b nn            : dc.b nn


  // 2c nn            : dc.b nn


  // 2d nn            : dc.b nn


  // 2e nn            : dc.b nn


  // 2f nn            : dc.b nn


  // 30 nn            : dc.b nn


  // 31 nn            : dc.b nn


  // 32 nn            : dc.b nn


  // 33 nn            : dc.b nn


  // 34 nn            : dc.b nn


  // 35 nn            : dc.b nn


  // 36 nn            : dc.b nn


  // 37 nn            : dc.b nn


  // 38 nn            : dc.b nn


  // 39 nn            : dc.b nn


  // 3a nn            : dc.b nn


  // 3b nn            : dc.b nn


  // 3c nn            : dc.b nn


  // 3d nn            : dc.b nn


  // 3e nn            : dc.b nn


  // 3f nn            : dc.b nn


  // 40 nn            : dc.b nn


  // 41 nn            : dc.b nn


  // 42 nn            : dc.b nn


  // 43 nn            : dc.b nn


  // 44 nn            : dc.b nn


  // 45 nn            : dc.b nn


  // 46 nn            : dc.b nn


  // 47 nn            : dc.b nn


  // 48 nn            : dc.b nn


  // 49 nn            : dc.b nn


  // 4a nn            : dc.b nn


  // 4b nn            : dc.b nn


  // 4c nn            : dc.b nn


  // 4d nn            : dc.b nn


  // 4e nn            : dc.b nn


  // 4f nn            : dc.b nn


  // 50 nn            : dc.b nn


  // 51 nn            : dc.b nn


  // 52 nn            : dc.b nn


  // 53 nn            : dc.b nn


  // 54 nn            : dc.b nn


  // 55 nn            : dc.b nn


  // 56 nn            : dc.b nn


  // 57 nn            : dc.b nn


  // 58 nn            : dc.b nn


  // 59 nn            : dc.b nn


  // 5a nn            : dc.b nn


  // 5b nn            : dc.b nn


  // 5c nn            : dc.b nn


  // 5d nn            : dc.b nn


  // 5e nn            : dc.b nn


  // 5f nn            : dc.b nn


  // 60 nn            : dc.b nn


  // 61 nn            : dc.b nn


  // 62 nn            : dc.b nn


  // 63 nn            : dc.b nn


  // 64 nn            : dc.b nn


  // 65 nn            : dc.b nn


  // 66 nn            : dc.b nn


  // 67 nn            : dc.b nn


  // 68 nn            : dc.b nn


  // 69 nn            : dc.b nn


  // 6a nn            : dc.b nn


  // 6b nn            : dc.b nn


  // 6c nn            : dc.b nn


  // 6d nn            : dc.b nn


  // 6e nn            : dc.b nn


  // 6f nn            : dc.b nn


  // 70 nn            : dc.b nn


  // 71 nn            : dc.b nn


  // 72 nn            : dc.b nn


  // 73 nn            : dc.b nn


  // 74 nn            : dc.b nn


  // 75 nn            : dc.b nn


  // 76 nn            : dc.b nn


  // 77 nn            : dc.b nn


  // 78 nn            : dc.b nn


  // 79 nn            : dc.b nn


  // 7a nn            : dc.b nn


  // 7b nn            : dc.b nn


  // 7c nn            : dc.b nn


  // 7d nn            : dc.b nn


  // 7e nn            : dc.b nn


  // 7f nn            : dc.b nn


  // 80 nn            : dc.b nn


  // 81 nn            : dc.b nn


  // 82 nn            : dc.b nn


  // 83 nn            : dc.b nn


  // 84 nn            : dc.b nn


  // 85 nn            : dc.b nn


  // 86 nn            : dc.b nn


  // 87 nn            : dc.b nn


  // 88 nn            : dc.b nn


  // 89 nn            : dc.b nn


  // 8a nn            : dc.b nn


  // 8b nn            : dc.b nn


  // 8c nn            : dc.b nn


  // 8d nn            : dc.b nn


  // 8e nn            : dc.b nn


  // 8f nn            : dc.b nn


  // 90 nn            : dc.b nn


  // 91 nn            : dc.b nn


  // 92 nn            : dc.b nn


  // 93 nn            : dc.b nn


  // 94 nn            : dc.b nn


  // 95 nn            : dc.b nn


  // 96 nn            : dc.b nn


  // 97 nn            : dc.b nn


  // 98 nn            : dc.b nn


  // 99 nn            : dc.b nn


  // 9a nn            : dc.b nn


  // 9b nn            : dc.b nn


  // 9c nn            : dc.b nn


  // 9d nn            : dc.b nn


  // 9e               : keyp @r


  // 9e nn            : dc.b nn


  // 9f nn            : dc.b nn


  // a0 nn            : dc.b nn


  // a1               : keynp @r


  // a1 nn            : dc.b nn


  // a2 nn            : dc.b nn


  // a3 nn            : dc.b nn


  // a4 nn            : dc.b nn


  // a5 nn            : dc.b nn


  // a6 nn            : dc.b nn


  // a7 nn            : dc.b nn


  // a8 nn            : dc.b nn


  // a9 nn            : dc.b nn


  // aa nn            : dc.b nn


  // ab nn            : dc.b nn


  // ac nn            : dc.b nn


  // ad nn            : dc.b nn


  // ae nn            : dc.b nn


  // af nn            : dc.b nn


  // b0 nn            : dc.b nn


  // b1 nn            : dc.b nn


  // b2 nn            : dc.b nn


  // b3 nn            : dc.b nn


  // b4 nn            : dc.b nn


  // b5 nn            : dc.b nn


  // b6 nn            : dc.b nn


  // b7 nn            : dc.b nn


  // b8 nn            : dc.b nn


  // b9 nn            : dc.b nn


  // ba nn            : dc.b nn


  // bb nn            : dc.b nn


  // bc nn            : dc.b nn


  // bd nn            : dc.b nn


  // be nn            : dc.b nn


  // bf nn            : dc.b nn


  // c0 nn            : dc.b nn


  // c1 nn            : dc.b nn


  // c2 nn            : dc.b nn


  // c3 nn            : dc.b nn


  // c4 nn            : dc.b nn


  // c5 nn            : dc.b nn


  // c6 nn            : dc.b nn


  // c7 nn            : dc.b nn


  // c8 nn            : dc.b nn


  // c9 nn            : dc.b nn


  // ca nn            : dc.b nn


  // cb nn            : dc.b nn


  // cc nn            : dc.b nn


  // cd nn            : dc.b nn


  // ce nn            : dc.b nn


  // cf nn            : dc.b nn


  // d0 nn            : dc.b nn


  // d1 nn            : dc.b nn


  // d2 nn            : dc.b nn


  // d3 nn            : dc.b nn


  // d4 nn            : dc.b nn


  // d5 nn            : dc.b nn


  // d6 nn            : dc.b nn


  // d7 nn            : dc.b nn


  // d8 nn            : dc.b nn


  // d9 nn            : dc.b nn


  // da nn            : dc.b nn


  // db nn            : dc.b nn


  // dc nn            : dc.b nn


  // dd nn            : dc.b nn


  // de nn            : dc.b nn


  // df nn            : dc.b nn


  // e0 nn            : dc.b nn


  // e1 nn            : dc.b nn


  // e2 nn            : dc.b nn


  // e3 nn            : dc.b nn


  // e4 nn            : dc.b nn


  // e5 nn            : dc.b nn


  // e6 nn            : dc.b nn


  // e7 nn            : dc.b nn


  // e8 nn            : dc.b nn


  // e9 nn            : dc.b nn


  // ea nn            : dc.b nn


  // eb nn            : dc.b nn


  // ec nn            : dc.b nn


  // ed nn            : dc.b nn


  // ee nn            : dc.b nn


  // ef nn            : dc.b nn


  // f0 nn            : dc.b nn


  // f1 nn            : dc.b nn


  // f2 nn            : dc.b nn


  // f3 nn            : dc.b nn


  // f4 nn            : dc.b nn


  // f5 nn            : dc.b nn


  // f6 nn            : dc.b nn


  // f7 nn            : dc.b nn


  // f8 nn            : dc.b nn


  // f9 nn            : dc.b nn


  // fa nn            : dc.b nn


  // fb nn            : dc.b nn


  // fc nn            : dc.b nn


  // fd nn            : dc.b nn


  // fe nn            : dc.b nn


  // ff nn            : dc.b nn


  // 00 nn            : dc.b nn


  // 01 nn            : dc.b nn


  // 02 nn            : dc.b nn


  // 03 nn            : dc.b nn


  // 04 nn            : dc.b nn


  // 05 nn            : dc.b nn


  // 06 nn            : dc.b nn


  // 07               : ld @r, DT


  // 07 nn            : dc.b nn


  // 08 nn            : dc.b nn


  // 09 nn            : dc.b nn


  // 0a               : ld @r, K


  // 0a nn            : dc.b nn


  // 0b nn            : dc.b nn


  // 0c nn            : dc.b nn


  // 0d nn            : dc.b nn


  // 0e nn            : dc.b nn


  // 0f nn            : dc.b nn


  // 10 nn            : dc.b nn


  // 11 nn            : dc.b nn


  // 12 nn            : dc.b nn


  // 13 nn            : dc.b nn


  // 14 nn            : dc.b nn


  // 15               : ld DT, @r


  // 15 nn            : dc.b nn


  // 16 nn            : dc.b nn


  // 17 nn            : dc.b nn


  // 18               : ld ST, @r


  // 18 nn            : dc.b nn


  // 19 nn            : dc.b nn


  // 1a nn            : dc.b nn


  // 1b nn            : dc.b nn


  // 1c nn            : dc.b nn


  // 1d nn            : dc.b nn


  // 1e               : add I, @r


  // 1e nn            : dc.b nn


  // 1f nn            : dc.b nn


  // 20 nn            : dc.b nn


  // 21 nn            : dc.b nn


  // 22 nn            : dc.b nn


  // 23 nn            : dc.b nn


  // 24 nn            : dc.b nn


  // 25 nn            : dc.b nn


  // 26 nn            : dc.b nn


  // 27 nn            : dc.b nn


  // 28 nn            : dc.b nn


  // 29               : set I, (@r)


  // 29 nn            : dc.b nn


  // 2a nn            : dc.b nn


  // 2b nn            : dc.b nn


  // 2c nn            : dc.b nn


  // 2d nn            : dc.b nn


  // 2e nn            : dc.b nn


  // 2f nn            : dc.b nn


  // 30 nn            : dc.b nn


  // 31 nn            : dc.b nn


  // 32 nn            : dc.b nn


  // 33               : bcd I, (@r)


  // 33 nn            : dc.b nn


  // 34 nn            : dc.b nn


  // 35 nn            : dc.b nn


  // 36 nn            : dc.b nn


  // 37 nn            : dc.b nn


  // 38 nn            : dc.b nn


  // 39 nn            : dc.b nn


  // 3a nn            : dc.b nn


  // 3b nn            : dc.b nn


  // 3c nn            : dc.b nn


  // 3d nn            : dc.b nn


  // 3e nn            : dc.b nn


  // 3f nn            : dc.b nn


  // 40 nn            : dc.b nn


  // 41 nn            : dc.b nn


  // 42 nn            : dc.b nn


  // 43 nn            : dc.b nn


  // 44 nn            : dc.b nn


  // 45 nn            : dc.b nn


  // 46 nn            : dc.b nn


  // 47 nn            : dc.b nn


  // 48 nn            : dc.b nn


  // 49 nn            : dc.b nn


  // 4a nn            : dc.b nn


  // 4b nn            : dc.b nn


  // 4c nn            : dc.b nn


  // 4d nn            : dc.b nn


  // 4e nn            : dc.b nn


  // 4f nn            : dc.b nn


  // 50 nn            : dc.b nn


  // 51 nn            : dc.b nn


  // 52 nn            : dc.b nn


  // 53 nn            : dc.b nn


  // 54 nn            : dc.b nn


  // 55               : cpy [I], v0-@r


  // 55 nn            : dc.b nn


  // 56 nn            : dc.b nn


  // 57 nn            : dc.b nn


  // 58 nn            : dc.b nn


  // 59 nn            : dc.b nn


  // 5a nn            : dc.b nn


  // 5b nn            : dc.b nn


  // 5c nn            : dc.b nn


  // 5d nn            : dc.b nn


  // 5e nn            : dc.b nn


  // 5f nn            : dc.b nn


  // 60 nn            : dc.b nn


  // 61 nn            : dc.b nn


  // 62 nn            : dc.b nn


  // 63 nn            : dc.b nn


  // 64 nn            : dc.b nn


  // 65               : cpy v0-@r, [I]


  // 65 nn            : dc.b nn


  // 66 nn            : dc.b nn


  // 67 nn            : dc.b nn


  // 68 nn            : dc.b nn


  // 69 nn            : dc.b nn


  // 6a nn            : dc.b nn


  // 6b nn            : dc.b nn


  // 6c nn            : dc.b nn


  // 6d nn            : dc.b nn


  // 6e nn            : dc.b nn


  // 6f nn            : dc.b nn


  // 70 nn            : dc.b nn


  // 71 nn            : dc.b nn


  // 72 nn            : dc.b nn


  // 73 nn            : dc.b nn


  // 74 nn            : dc.b nn


  // 75 nn            : dc.b nn


  // 76 nn            : dc.b nn


  // 77 nn            : dc.b nn


  // 78 nn            : dc.b nn


  // 79 nn            : dc.b nn


  // 7a nn            : dc.b nn


  // 7b nn            : dc.b nn


  // 7c nn            : dc.b nn


  // 7d nn            : dc.b nn


  // 7e nn            : dc.b nn


  // 7f nn            : dc.b nn


  // 80 nn            : dc.b nn


  // 81 nn            : dc.b nn


  // 82 nn            : dc.b nn


  // 83 nn            : dc.b nn


  // 84 nn            : dc.b nn


  // 85 nn            : dc.b nn


  // 86 nn            : dc.b nn


  // 87 nn            : dc.b nn


  // 88 nn            : dc.b nn


  // 89 nn            : dc.b nn


  // 8a nn            : dc.b nn


  // 8b nn            : dc.b nn


  // 8c nn            : dc.b nn


  // 8d nn            : dc.b nn


  // 8e nn            : dc.b nn


  // 8f nn            : dc.b nn


  // 90 nn            : dc.b nn


  // 91 nn            : dc.b nn


  // 92 nn            : dc.b nn


  // 93 nn            : dc.b nn


  // 94 nn            : dc.b nn


  // 95 nn            : dc.b nn


  // 96 nn            : dc.b nn


  // 97 nn            : dc.b nn


  // 98 nn            : dc.b nn


  // 99 nn            : dc.b nn


  // 9a nn            : dc.b nn


  // 9b nn            : dc.b nn


  // 9c nn            : dc.b nn


  // 9d nn            : dc.b nn


  // 9e nn            : dc.b nn


  // 9f nn            : dc.b nn


  // a0 nn            : dc.b nn


  // a1 nn            : dc.b nn


  // a2 nn            : dc.b nn


  // a3 nn            : dc.b nn


  // a4 nn            : dc.b nn


  // a5 nn            : dc.b nn


  // a6 nn            : dc.b nn


  // a7 nn            : dc.b nn


  // a8 nn            : dc.b nn


  // a9 nn            : dc.b nn


  // aa nn            : dc.b nn


  // ab nn            : dc.b nn


  // ac nn            : dc.b nn


  // ad nn            : dc.b nn


  // ae nn            : dc.b nn


  // af nn            : dc.b nn


  // b0 nn            : dc.b nn


  // b1 nn            : dc.b nn


  // b2 nn            : dc.b nn


  // b3 nn            : dc.b nn


  // b4 nn            : dc.b nn


  // b5 nn            : dc.b nn


  // b6 nn            : dc.b nn


  // b7 nn            : dc.b nn


  // b8 nn            : dc.b nn


  // b9 nn            : dc.b nn


  // ba nn            : dc.b nn


  // bb nn            : dc.b nn


  // bc nn            : dc.b nn


  // bd nn            : dc.b nn


  // be nn            : dc.b nn


  // bf nn            : dc.b nn


  // c0 nn            : dc.b nn


  // c1 nn            : dc.b nn


  // c2 nn            : dc.b nn


  // c3 nn            : dc.b nn


  // c4 nn            : dc.b nn


  // c5 nn            : dc.b nn


  // c6 nn            : dc.b nn


  // c7 nn            : dc.b nn


  // c8 nn            : dc.b nn


  // c9 nn            : dc.b nn


  // ca nn            : dc.b nn


  // cb nn            : dc.b nn


  // cc nn            : dc.b nn


  // cd nn            : dc.b nn


  // ce nn            : dc.b nn


  // cf nn            : dc.b nn


  // d0 nn            : dc.b nn


  // d1 nn            : dc.b nn


  // d2 nn            : dc.b nn


  // d3 nn            : dc.b nn


  // d4 nn            : dc.b nn


  // d5 nn            : dc.b nn


  // d6 nn            : dc.b nn


  // d7 nn            : dc.b nn


  // d8 nn            : dc.b nn


  // d9 nn            : dc.b nn


  // da nn            : dc.b nn


  // db nn            : dc.b nn


  // dc nn            : dc.b nn


  // dd nn            : dc.b nn


  // de nn            : dc.b nn


  // df nn            : dc.b nn


  // e0 nn            : dc.b nn


  // e1 nn            : dc.b nn


  // e2 nn            : dc.b nn


  // e3 nn            : dc.b nn


  // e4 nn            : dc.b nn


  // e5 nn            : dc.b nn


  // e6 nn            : dc.b nn


  // e7 nn            : dc.b nn


  // e8 nn            : dc.b nn


  // e9 nn            : dc.b nn


  // ea nn            : dc.b nn


  // eb nn            : dc.b nn


  // ec nn            : dc.b nn


  // ed nn            : dc.b nn


  // ee nn            : dc.b nn


  // ef nn            : dc.b nn


  // f0 nn            : dc.b nn


  // f1 nn            : dc.b nn


  // f2 nn            : dc.b nn


  // f3 nn            : dc.b nn


  // f4 nn            : dc.b nn


  // f5 nn            : dc.b nn


  // f6 nn            : dc.b nn


  // f7 nn            : dc.b nn


  // f8 nn            : dc.b nn


  // f9 nn            : dc.b nn


  // fa nn            : dc.b nn


  // fb nn            : dc.b nn


  // fc nn            : dc.b nn


  // fd nn            : dc.b nn


  // fe nn            : dc.b nn


  // ff nn            : dc.b nn

});