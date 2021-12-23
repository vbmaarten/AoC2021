#include <stdio.h>
#include <stdbool.h>

typedef int RebootRange[2];

struct RebootCube {
    RebootRange x;
    RebootRange y;
    RebootRange z;
};

struct RebootStep {
    bool on;
    struct RebootCube ranges;
};



RebootRange rangeOverlap(RebootRange rangeA, RebootRange rangeB){
    
}

int rangeLength(RebootRange range){
    return range[1]-range[0]+1;
}

int cubeSize(struct RebootCube cube){
    return rangeLength(cube.x) * rangeLength(cube.y) * rangeLength(cube.z);
}

int main(void) {
    struct RebootCube cube = {{0,1},{0,1},{0,1}};
    char result[100];
    sprintf(result, "%d", cubeSize(cube));
    printf(result);
}