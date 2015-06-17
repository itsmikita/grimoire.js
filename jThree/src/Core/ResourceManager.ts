import JThreeContext = require("./JThreeContext");
import JThreeContextProxy = require("./JThreeContextProxy");
import BufferTargetType = require("../Wrapper/BufferTargetType");
import BufferUsageType = require("../Wrapper/BufferUsageType");
import ElementType = require("../Wrapper/ElementType");
import ShaderType = require("../Wrapper/ShaderType");
import Delegates = require('../Delegates');
import jThreeObject = require("../Base/JThreeObject");
import Buffer = require("./Resources/Buffer/Buffer");
import Shader = require("./Resources/Shader/Shader");
import Program = require("./Resources/Program/Program");
import Texture = require('./Resources/Texture/Texture');
import AssociativeArray = require('../Base/Collections/AssociativeArray');
import RBO = require('./Resources/RBO/RBO');
import ResourceArray = require('./Resources/ResourceArray');
import FBO = require('./Resources/FBO/FBO');
import BufferTexture = require('./Resources/Texture/BufferTexture');
import TextureFormat = require('../Wrapper/TextureInternalFormatType');
import ElementFormat = require('../Wrapper/TextureType');
import BufferTextureWrapper = require('./Resources/Texture/BufferTextureWrapper');
import TextureWrapper = require('./Resources/Texture/TextureWrapper');
import TextureBase = require('./Resources/Texture/TextureBase');
type ImageSource = HTMLCanvasElement|HTMLImageElement|ImageData|ArrayBufferView;

/**
 * コンテキストを跨いでリソースを管理するクラスをまとめているクラス
 */
class ResourceManager extends jThreeObject {

    constructor() {
        super();
    }

    private get context(): JThreeContext {
        return JThreeContextProxy.getJThreeContext();
    }

    private buffers: ResourceArray<Buffer> = new ResourceArray<Buffer>();

    createBuffer(id: string, target: BufferTargetType, usage: BufferUsageType, unitCount: number, elementType: ElementType): Buffer {
        return this.buffers.create(id, () => {
            return Buffer.CreateBuffer(this.context, target, usage, unitCount, elementType);
        });
    }

    getBuffer(id: string): Buffer {
        return this.buffers.get(id);
    }

    private shaders: ResourceArray<Shader> = new ResourceArray<Shader>();

    createShader(id: string, source: string, shaderType: ShaderType): Shader {
        return this.shaders.create(id, () => {
            return Shader.CreateShader(this.context, source, shaderType);
        });
    }

    getShader(id: string): Shader {
        return this.shaders.get(id);
    }

    hasShader(id: string): boolean {
        return this.shaders.has(id);
    }

    private programs: ResourceArray<Program> = new ResourceArray<Program>();

    createProgram(id: string, shaders: Shader[]): Program {
        return this.programs.create(id, () => {
            return Program.CreateProgram(this.context, shaders);
        });
    }

    getProgram(id: string): Program {
        return this.programs.get(id);
    }

    private textures: ResourceArray<TextureBase> = new ResourceArray<TextureBase>();


    createTextureWithSource(id: string, source: ImageSource): Texture {
        return <Texture>this.textures.create(id, () => {
            var tex = new Texture(this.context, source);
            tex.each(v=> v.init());//TODO I wonder tmdhere is no need to initialize all context exisiting.
            return tex;
        });
    }

    getTexture(id: string): Texture {
        return <Texture>this.textures.get(id);
    }

    private rbos: ResourceArray<RBO> = new ResourceArray<RBO>(
        );

    createRBO(id: string, width: number, height: number): RBO {
        return this.rbos.create(id, () => {
            var r = new RBO(this.context, width, height);
            r.each(v=> v.init());
            return r;
        });
    }

    getRBO(id: string): RBO {
        return this.rbos.get(id);
    }

    private fbos: ResourceArray<FBO> = new ResourceArray<FBO>();

    createFBO(id: string): FBO {
        return this.fbos.create(id, () => {
            var fbo = new FBO(this.context);
            fbo.each(v=> v.init());
            return fbo;
        });
    }

    createTexture(id: string, width: number, height: number, texType: TextureFormat = TextureFormat.RGBA, elemType: ElementFormat = ElementFormat.UnsignedShort4444) {
        return this.textures.create(id, () => {
            var bt = new BufferTexture(this.context, width, height, texType, elemType);
            bt.each(v=> v.init());
            return bt;
        });
    }

    public toString() {
        return `buffer:${this.buffers.toString() }\nshader:${this.shaders.toString() }\nprograms:${this.programs.toString() }\ntexture:${this.textures.toString() }`;
    }
}
export =ResourceManager;
