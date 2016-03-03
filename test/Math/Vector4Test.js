import PA from "power-assert";
const assert = PA.default;

import sinon from "sinon";
import Vector4 from "../../lib/Math/Vector4";

describe("Vector4 test",()=>{
  it("equals with is correct",()=>{
    assert((new Vector4(0,1,1,0)).equalWith(new Vector4(0,1,1,0)));
  });
  it("equals with is correct 2",()=>{
    assert(!(new Vector4(0,1,2,0)).equalWith(new Vector4(0,1,1,0)));
  });
  it("nearly equals with is correct",()=>{
    assert((new Vector4(0,1,1,1)).nearlyEqualWith(new Vector4(0.001,1.001,1.001,0.999)));
  });
  it("Get the number of elements of a vector test",()=>{
    assert((new Vector4(0,1,1,2)).ElementCount === 4);
  });
  it("XUnit test",()=>{
    assert(Vector4.XUnit.equalWith(new Vector4(1,0,0,0)));
  });
  it("YUnit test",()=>{
    assert(Vector4.YUnit.equalWith(new Vector4(0,1,0,0)));
  });
  it("ZUnit test",()=>{
    assert(Vector4.ZUnit.equalWith(new Vector4(0,0,1,0)));
  });
  it("WUnit test",()=>{
    assert(Vector4.WUnit.equalWith(new Vector4(0,0,0,1)));
  });
  it("One Vector test",()=>{
    assert(Vector4.One.equalWith(new Vector4(1,1,1,1)));
  });
  it("Zero vector test",()=>{
    assert(Vector4.Zero.equalWith(new Vector4(0,0,0,0)));
  });
  it("copying vector test",()=>{
    assert(Vector4.copy(new Vector4(0,1,1,2)).equalWith(new Vector4(0,1,1,2)));
  });
  it("Get X of a vector test",()=>{
    assert((new Vector4(0,1,1,2).X == 0));
  });
  it("Get Y of a vector test",()=>{
    assert((new Vector4(0,1,1,2).Y == 1));
  });
  it("Get Z of a vector test",()=>{
    assert((new Vector4(0,1,1,2).Z == 1));
  });
  it("Get W of a vector test",()=>{
    assert((new Vector4(0,1,1,2).W == 2));
  });

  it("Set X of a vector test",()=>{
    let vec = new Vector4(0,1,1,2);
    vec.X = 2;
    assert(vec.equalWith(new Vector4(2,1,1,2)));
  });

  it("Set Y of a vector test",()=>{
    let vec = new Vector4(0,1,1,2);
    vec.Y = 2;
    assert(vec.equalWith(new Vector4(0,2,1,2)));
  });

  it("Set Z of a vector test",()=>{
    let vec = new Vector4(0,1,1,2);
    vec.Z = 3;
    assert(vec.equalWith(new Vector4(0,1,3,2)));
  });

  it("Set W of a vector test",()=>{
    let vec = new Vector4(0,1,1,2);
    vec.W = 3;
    assert(vec.equalWith(new Vector4(0,1,1,3)));
  });

  it("Dot vectors test",()=>{
    assert(Vector4.dot(new Vector4(1,1,1,2),new Vector4(1,1,2,3))===10);
  });
  it("Add vectors test",()=>{
    assert(Vector4.add(new Vector4(0,1,1,2),new Vector4(0,1,2,3)).equalWith(new Vector4(0,2,3,5)));
  });
  it("Subtract vectors test",()=>{
    assert(Vector4.subtract(new Vector4(0,1,2,3),new Vector4(0,1,1,2)).equalWith(new Vector4(0,0,1,1)));
  });
  it("Multiply a vector test",()=>{
    assert(Vector4.multiply(2,new Vector4(0,1,1,2)).equalWith(new Vector4(0,2,2,4)));
  });
  it("Negate a vector test",()=>{
    assert(Vector4.negate(new Vector4(0,1,1,2)).equalWith(new Vector4(0,-1,-1,-2)));
  });
  it("Compare vectors test",()=>{
    assert(Vector4.equals(new Vector4(0,1,1,2),new Vector4(0,1,1,2))===true);
  });
  it("Roughly compare vectors test",()=>{
    assert(Vector4.nearlyEquals(new Vector4(0,1,1,2),new Vector4(0.0000001,1,1.009,2.001))===true);
  });
  it("Normalize a vector test for x axis",()=>{
    assert(Vector4.normalize(new Vector4(0,2,0,0)).equalWith(new Vector4(0,1,0,0)));
  });

  it("Normalize a vector test for a leaning axis",()=>{
    assert(Vector4.normalize(new Vector4(0,1,2,2)).nearlyEqualWith(new Vector4(0,0.333,0.666,0.666)));
  });

  it("Extract min elements from vectors test",()=>{
    assert(Vector4.min(new Vector4(0,1,1,2),new Vector4(0,1,2,1)).equalWith(new Vector4(0,1,1,1)));
  });
  it("Extract max elements from vectors test",()=>{
    assert(Vector4.max(new Vector4(0,1,1,2),new Vector4(0,1,2,1)).equalWith(new Vector4(0,1,2,2)));
  });
  it("Create an angle from Vector4 test",()=>{
    assert(Math.abs(Vector4.angle(new Vector4(0,1,1,0),new Vector4(0,1,0,1)) - 1.047197551) <= 0.01);
  });
  it("A vector dot with another one test",()=>{
    assert((new Vector4(0,1,1,2)).dotWith(new Vector4(0,1,2,3))===9);
  });
  it("Add vectors test",()=>{
    assert((new Vector4(0,1,1,2)).addWith(new Vector4(0,1,2,3)).equalWith(new Vector4(0,2,3,5)));
  });
  it("Subtract vectors test",()=>{
    assert((new Vector4(0,1,1,2)).subtractWith(new Vector4(0,1,2,3)).equalWith(new Vector4(0,0,-1,-1)));
  });
  it("multiply vectors test",()=>{
    assert((new Vector4(0,1,1,2)).multiplyWith(2).equalWith(new Vector4(0,2,2,4)));
  });
  it("negate a vector test",()=>{
    assert((new Vector4(0,1,1,2)).negateThis().equalWith(new Vector4(0,-1,-1,-2)));
  });
  it("normalize this vector test",()=>{
    assert((new Vector4(0,1,2,2)).normalizeThis().nearlyEqualWith(new Vector4(0,0.333,0.666,0.666)));
  });
  it("a vector to string test",()=>{
    assert((new Vector4(0,1,1,2)).toString()==='(0, 1, 1, 2)');
  });
  it("a vector to display string",()=>{
    assert((new Vector4(0,1,1,2)).toDisplayString()==='Vector4(0, 1, 1, 2)');
  });
  it("a vector to mathematicastring",()=>{
    assert((new Vector4(0,1,1,2)).toMathematicaString()==='{0,1,1,2}');
  });

});
