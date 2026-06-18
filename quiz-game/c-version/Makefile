# Makefile — ISMAGI Quiz Game (version C)
# Usage : make        -> compile le jeu
#         make run    -> compile puis lance
#         make clean  -> supprime les fichiers générés

CC      = gcc
CFLAGS  = -Wall -Wextra -O2
TARGET  = quiz

$(TARGET): quiz.c
	$(CC) $(CFLAGS) quiz.c -o $(TARGET)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET) $(TARGET).exe

.PHONY: run clean
