---
title: Schema.ts
nav_order: 98
parent: "effect"
---

## Schema.ts overview

---

## Exports Grouped by Category

- [Arbitrary](#arbitrary)
  - [LazyArbitrary (type alias)](#lazyarbitrary-type-alias)
  - [toArbitrary](#toarbitrary)
  - [toArbitraryLazy](#toarbitrarylazy)
- [Array checks](#array-checks)
  - [isUnique](#isunique)
- [BigDecimal](#bigdecimal)
  - [BigDecimal](#bigdecimal-1)
  - [BigDecimal (interface)](#bigdecimal-interface)
  - [BigDecimalFromString](#bigdecimalfromstring)
  - [BigDecimalFromString (interface)](#bigdecimalfromstring-interface)
- [BigDecimal checks](#bigdecimal-checks)
  - [isBetweenBigDecimal](#isbetweenbigdecimal)
  - [isGreaterThanBigDecimal](#isgreaterthanbigdecimal)
  - [isGreaterThanOrEqualToBigDecimal](#isgreaterthanorequaltobigdecimal)
  - [isLessThanBigDecimal](#islessthanbigdecimal)
  - [isLessThanOrEqualToBigDecimal](#islessthanorequaltobigdecimal)
- [BigInt](#bigint)
  - [BigIntFromString](#bigintfromstring)
  - [BigIntFromString (interface)](#bigintfromstring-interface)
- [BigInt checks](#bigint-checks)
  - [isBetweenBigInt](#isbetweenbigint)
  - [isGreaterThanBigInt](#isgreaterthanbigint)
  - [isGreaterThanOrEqualToBigInt](#isgreaterthanorequaltobigint)
  - [isLessThanBigInt](#islessthanbigint)
  - [isLessThanOrEqualToBigInt](#islessthanorequaltobigint)
- [Canonical Codecs](#canonical-codecs)
  - [StringTree (type alias)](#stringtree-type-alias)
  - [toCodecArrayFromSingle](#tocodecarrayfromsingle)
  - [toCodecArrayFromSingle (interface)](#tocodecarrayfromsingle-interface)
  - [toCodecIso](#tocodeciso)
  - [toCodecJson](#tocodecjson)
  - [toCodecJson (interface)](#tocodecjson-interface)
  - [toCodecStringTree](#tocodecstringtree)
  - [toCodecStringTree (interface)](#tocodecstringtree-interface)
  - [toEncoderXml](#toencoderxml)
- [Cause](#cause)
  - [Cause](#cause-1)
  - [Cause (interface)](#cause-interface)
  - [CauseIso (type alias)](#causeiso-type-alias)
- [CauseReason](#causereason)
  - [CauseReason](#causereason-1)
  - [CauseReason (interface)](#causereason-interface)
  - [CauseReasonIso (type alias)](#causereasoniso-type-alias)
- [Chunk](#chunk)
  - [Chunk](#chunk-1)
  - [Chunk (interface)](#chunk-interface)
  - [ChunkIso (type alias)](#chunkiso-type-alias)
- [Date](#date)
  - [Date](#date-1)
  - [Date (interface)](#date-interface)
  - [DateFromString](#datefromstring)
  - [DateFromString (interface)](#datefromstring-interface)
  - [DateValid](#datevalid)
  - [DateValid (interface)](#datevalid-interface)
- [Date checks](#date-checks)
  - [isBetweenDate](#isbetweendate)
  - [isDateValid](#isdatevalid)
  - [isGreaterThanDate](#isgreaterthandate)
  - [isGreaterThanOrEqualToDate](#isgreaterthanorequaltodate)
  - [isLessThanDate](#islessthandate)
  - [isLessThanOrEqualToDate](#islessthanorequaltodate)
- [DateTime](#datetime)
  - [DateTimeUtc](#datetimeutc)
  - [DateTimeUtc (interface)](#datetimeutc-interface)
  - [DateTimeUtcFromDate](#datetimeutcfromdate)
  - [DateTimeUtcFromDate (interface)](#datetimeutcfromdate-interface)
  - [DateTimeUtcFromMillis](#datetimeutcfrommillis)
  - [DateTimeUtcFromMillis (interface)](#datetimeutcfrommillis-interface)
  - [DateTimeUtcFromString](#datetimeutcfromstring)
  - [DateTimeUtcFromString (interface)](#datetimeutcfromstring-interface)
  - [DateTimeZoned](#datetimezoned)
  - [DateTimeZoned (interface)](#datetimezoned-interface)
  - [DateTimeZonedFromString](#datetimezonedfromstring)
  - [DateTimeZonedFromString (interface)](#datetimezonedfromstring-interface)
  - [TimeZone](#timezone)
  - [TimeZone (interface)](#timezone-interface)
  - [TimeZoneFromString](#timezonefromstring)
  - [TimeZoneFromString (interface)](#timezonefromstring-interface)
  - [TimeZoneNamed](#timezonenamed)
  - [TimeZoneNamed (interface)](#timezonenamed-interface)
  - [TimeZoneNamedFromString](#timezonenamedfromstring)
  - [TimeZoneNamedFromString (interface)](#timezonenamedfromstring-interface)
  - [TimeZoneOffset](#timezoneoffset)
  - [TimeZoneOffset (interface)](#timezoneoffset-interface)
- [Defect](#defect)
  - [Defect (interface)](#defect-interface)
- [Duration](#duration)
  - [Duration](#duration-1)
  - [Duration (interface)](#duration-interface)
  - [DurationFromMillis](#durationfrommillis)
  - [DurationFromMillis (interface)](#durationfrommillis-interface)
  - [DurationFromNanos](#durationfromnanos)
  - [DurationFromNanos (interface)](#durationfromnanos-interface)
  - [DurationFromString](#durationfromstring)
  - [DurationFromString (interface)](#durationfromstring-interface)
- [Error](#error)
  - [Error (interface)](#error-interface)
- [Exit](#exit)
  - [Exit](#exit-1)
  - [Exit (interface)](#exit-interface)
  - [ExitIso (type alias)](#exitiso-type-alias)
- [FormData](#formdata)
  - [FormData](#formdata-1)
  - [FormData (interface)](#formdata-interface)
  - [fromFormData (interface)](#fromformdata-interface)
- [Formatter](#formatter)
  - [overrideToFormatter](#overridetoformatter)
  - [toFormatter](#toformatter)
- [HashMap](#hashmap)
  - [HashMap](#hashmap-1)
  - [HashMap (interface)](#hashmap-interface)
  - [HashMapIso (type alias)](#hashmapiso-type-alias)
- [HashSet](#hashset)
  - [HashSet](#hashset-1)
  - [HashSet (interface)](#hashset-interface)
  - [HashSetIso (type alias)](#hashsetiso-type-alias)
- [Integer checks](#integer-checks)
  - [isInt](#isint)
  - [isInt32](#isint32)
  - [isUint32](#isuint32)
- [Length checks](#length-checks)
  - [isLengthBetween](#islengthbetween)
  - [isMaxLength](#ismaxlength)
  - [isMinLength](#isminlength)
  - [isNonEmpty](#isnonempty)
- [Number](#number)
  - [Finite](#finite)
  - [Finite (interface)](#finite-interface)
  - [FiniteFromString](#finitefromstring)
  - [FiniteFromString (interface)](#finitefromstring-interface)
  - [Int](#int)
  - [Int (interface)](#int-interface)
  - [NumberFromString](#numberfromstring)
  - [NumberFromString (interface)](#numberfromstring-interface)
- [Number checks](#number-checks)
  - [isBetween](#isbetween)
  - [isFinite](#isfinite)
  - [isGreaterThan](#isgreaterthan)
  - [isGreaterThanOrEqualTo](#isgreaterthanorequalto)
  - [isLessThan](#islessthan)
  - [isLessThanOrEqualTo](#islessthanorequalto)
  - [isMultipleOf](#ismultipleof)
- [Numeric checks](#numeric-checks)
  - [makeIsMultipleOf](#makeismultipleof)
- [Object checks](#object-checks)
  - [isMaxProperties](#ismaxproperties)
  - [isMinProperties](#isminproperties)
  - [isPropertiesLengthBetween](#ispropertieslengthbetween)
  - [isPropertyNames](#ispropertynames)
- [Optic](#optic)
  - [overrideToCodecIso](#overridetocodeciso)
  - [overrideToCodecIso (interface)](#overridetocodeciso-interface)
  - [toIso](#toiso)
  - [toIsoFocus](#toisofocus)
  - [toIsoSource](#toisosource)
- [Option](#option)
  - [Option](#option-1)
  - [Option (interface)](#option-interface)
  - [OptionFromNullOr](#optionfromnullor)
  - [OptionFromNullOr (interface)](#optionfromnullor-interface)
  - [OptionFromNullishOr](#optionfromnullishor)
  - [OptionFromNullishOr (interface)](#optionfromnullishor-interface)
  - [OptionFromOptional](#optionfromoptional)
  - [OptionFromOptional (interface)](#optionfromoptional-interface)
  - [OptionFromOptionalKey](#optionfromoptionalkey)
  - [OptionFromOptionalKey (interface)](#optionfromoptionalkey-interface)
  - [OptionFromOptionalNullOr](#optionfromoptionalnullor)
  - [OptionFromOptionalNullOr (interface)](#optionfromoptionalnullor-interface)
  - [OptionFromUndefinedOr](#optionfromundefinedor)
  - [OptionFromUndefinedOr (interface)](#optionfromundefinedor-interface)
  - [OptionIso (type alias)](#optioniso-type-alias)
- [Order checks](#order-checks)
  - [makeIsBetween](#makeisbetween)
  - [makeIsGreaterThan](#makeisgreaterthan)
  - [makeIsGreaterThanOrEqualTo](#makeisgreaterthanorequalto)
  - [makeIsLessThan](#makeislessthan)
  - [makeIsLessThanOrEqualTo](#makeislessthanorequalto)
- [PropertyKey](#propertykey)
  - [PropertyKey](#propertykey-1)
- [ReadonlyMap](#readonlymap)
  - [$ReadonlyMap (interface)](#readonlymap-interface)
  - [ReadonlyMap](#readonlymap-1)
  - [ReadonlyMapIso (type alias)](#readonlymapiso-type-alias)
- [ReadonlySet](#readonlyset)
  - [$ReadonlySet (interface)](#readonlyset-interface)
  - [ReadonlySet](#readonlyset-1)
  - [ReadonlySetIso (type alias)](#readonlysetiso-type-alias)
- [Redacted](#redacted)
  - [Redacted](#redacted-1)
  - [Redacted (interface)](#redacted-interface)
  - [RedactedFromValue](#redactedfromvalue)
  - [RedactedFromValue (interface)](#redactedfromvalue-interface)
  - [redact](#redact)
- [RegExp](#regexp)
  - [RegExp](#regexp-1)
  - [RegExp (interface)](#regexp-interface)
- [Representation](#representation)
  - [toRepresentation](#torepresentation)
- [Schema Resolvers](#schema-resolvers)
  - [resolveAnnotations](#resolveannotations)
  - [resolveAnnotationsKey](#resolveannotationskey)
- [Size checks](#size-checks)
  - [isMaxSize](#ismaxsize)
  - [isMinSize](#isminsize)
  - [isSizeBetween](#issizebetween)
- [Standard Schema](#standard-schema)
  - [StandardSchemaV1FailureResult](#standardschemav1failureresult)
  - [toStandardJSONSchemaV1](#tostandardjsonschemav1)
  - [toStandardSchemaV1](#tostandardschemav1)
- [String checks](#string-checks)
  - [isBase64](#isbase64)
  - [isBase64Url](#isbase64url)
  - [isCapitalized](#iscapitalized)
  - [isEndsWith](#isendswith)
  - [isGUID](#isguid)
  - [isIncludes](#isincludes)
  - [isLowercased](#islowercased)
  - [isPattern](#ispattern)
  - [isStartsWith](#isstartswith)
  - [isStringBigInt](#isstringbigint)
  - [isStringFinite](#isstringfinite)
  - [isStringSymbol](#isstringsymbol)
  - [isTrimmed](#istrimmed)
  - [isULID](#isulid)
  - [isUUID](#isuuid)
  - [isUncapitalized](#isuncapitalized)
  - [isUppercased](#isuppercased)
- [Tree](#tree)
  - [Tree](#tree-1)
  - [Tree (type alias)](#tree-type-alias)
  - [TreeRecord (interface)](#treerecord-interface)
- [URL](#url)
  - [URL](#url-1)
  - [URL (interface)](#url-interface)
  - [URLFromString](#urlfromstring)
  - [URLFromString (interface)](#urlfromstring-interface)
- [Uint8Array](#uint8array)
  - [Uint8Array](#uint8array-1)
  - [Uint8Array (interface)](#uint8array-interface)
  - [Uint8ArrayFromBase64](#uint8arrayfrombase64)
  - [Uint8ArrayFromBase64 (interface)](#uint8arrayfrombase64-interface)
  - [Uint8ArrayFromBase64Url](#uint8arrayfrombase64url)
  - [Uint8ArrayFromBase64Url (interface)](#uint8arrayfrombase64url-interface)
  - [Uint8ArrayFromHex](#uint8arrayfromhex)
  - [Uint8ArrayFromHex (interface)](#uint8arrayfromhex-interface)
- [annotations](#annotations)
  - [annotate](#annotate)
  - [annotateEncoded](#annotateencoded)
  - [annotateKey](#annotatekey)
- [boolean](#boolean)
  - [Boolean](#boolean-1)
  - [BooleanFromBit](#booleanfrombit)
  - [BooleanFromBit (interface)](#booleanfrombit-interface)
- [branding](#branding)
  - [brand](#brand)
  - [brand (interface)](#brand-interface)
  - [fromBrand](#frombrand)
- [combinators](#combinators)
  - [fieldsAssign](#fieldsassign)
  - [mutableKey](#mutablekey)
  - [optional](#optional)
  - [optionalKey](#optionalkey)
  - [readonlyKey](#readonlykey)
  - [required](#required)
  - [requiredKey](#requiredkey)
  - [toTaggedUnion](#totaggedunion)
  - [toTaggedUnion (type alias)](#totaggedunion-type-alias)
- [constructors](#constructors)
  - [Array](#array)
  - [ArrayEnsure](#arrayensure)
  - [ArrayEnsure (interface)](#arrayensure-interface)
  - [Class](#class)
  - [Defect](#defect-1)
  - [Enum](#enum)
  - [Error](#error-1)
  - [ErrorClass](#errorclass)
  - [Literal](#literal)
  - [Literals](#literals)
  - [NonEmptyArray](#nonemptyarray)
  - [NullOr](#nullor)
  - [NullishOr](#nullishor)
  - [Opaque](#opaque)
  - [Record](#record)
  - [Struct](#struct)
  - [StructWithRest](#structwithrest)
  - [TaggedClass](#taggedclass)
  - [TaggedErrorClass](#taggederrorclass)
  - [TaggedStruct](#taggedstruct)
  - [TaggedUnion](#taggedunion)
  - [TemplateLiteral](#templateliteral)
  - [TemplateLiteralParser](#templateliteralparser)
  - [Tuple](#tuple)
  - [TupleWithRest](#tuplewithrest)
  - [UndefinedOr](#undefinedor)
  - [Union](#union)
  - [UniqueArray](#uniquearray)
  - [UniqueSymbol](#uniquesymbol)
  - [asClass](#asclass)
  - [declare](#declare)
  - [declare (interface)](#declare-interface)
  - [declareConstructor](#declareconstructor)
  - [declareConstructor (interface)](#declareconstructor-interface)
  - [fromJsonString](#fromjsonstring)
  - [instanceOf](#instanceof)
  - [make](#make)
  - [makeFilter](#makefilter)
  - [makeFilterGroup](#makefiltergroup)
  - [suspend](#suspend)
  - [tag](#tag)
  - [tag (interface)](#tag-interface)
  - [tagDefaultOmit](#tagdefaultomit)
  - [withConstructorDefault](#withconstructordefault)
  - [withConstructorDefault (interface)](#withconstructordefault-interface)
- [converting](#converting)
  - [toDifferJsonPatch](#todifferjsonpatch)
  - [toJsonSchemaDocument](#tojsonschemadocument)
- [decoding](#decoding)
  - [decodeEffect](#decodeeffect)
  - [decodeExit](#decodeexit)
  - [decodeOption](#decodeoption)
  - [decodePromise](#decodepromise)
  - [decodeResult](#decoderesult)
  - [decodeSync](#decodesync)
  - [decodeUnknownEffect](#decodeunknowneffect)
  - [decodeUnknownExit](#decodeunknownexit)
  - [decodeUnknownOption](#decodeunknownoption)
  - [decodeUnknownPromise](#decodeunknownpromise)
  - [decodeUnknownResult](#decodeunknownresult)
  - [decodeUnknownSync](#decodeunknownsync)
  - [fromFormData](#fromformdata)
  - [fromURLSearchParams](#fromurlsearchparams)
  - [middlewareDecoding](#middlewaredecoding)
  - [middlewareDecoding (interface)](#middlewaredecoding-interface)
  - [withDecodingDefault](#withdecodingdefault)
  - [withDecodingDefault (interface)](#withdecodingdefault-interface)
  - [withDecodingDefaultKey](#withdecodingdefaultkey)
  - [withDecodingDefaultKey (interface)](#withdecodingdefaultkey-interface)
  - [withDecodingDefaultType](#withdecodingdefaulttype)
  - [withDecodingDefaultType (interface)](#withdecodingdefaulttype-interface)
  - [withDecodingDefaultTypeKey](#withdecodingdefaulttypekey)
  - [withDecodingDefaultTypeKey (interface)](#withdecodingdefaulttypekey-interface)
- [encoding](#encoding)
  - [encodeEffect](#encodeeffect)
  - [encodeExit](#encodeexit)
  - [encodeOption](#encodeoption)
  - [encodePromise](#encodepromise)
  - [encodeResult](#encoderesult)
  - [encodeSync](#encodesync)
  - [encodeUnknownEffect](#encodeunknowneffect)
  - [encodeUnknownExit](#encodeunknownexit)
  - [encodeUnknownOption](#encodeunknownoption)
  - [encodeUnknownPromise](#encodeunknownpromise)
  - [encodeUnknownResult](#encodeunknownresult)
  - [encodeUnknownSync](#encodeunknownsync)
  - [middlewareEncoding](#middlewareencoding)
  - [middlewareEncoding (interface)](#middlewareencoding-interface)
- [error handling](#error-handling)
  - [catchDecoding](#catchdecoding)
  - [catchDecodingWithContext](#catchdecodingwithcontext)
  - [catchEncoding](#catchencoding)
  - [catchEncodingWithContext](#catchencodingwithcontext)
- [errors](#errors)
  - [SchemaError](#schemaerror)
- [file](#file)
  - [File](#file-1)
  - [File (interface)](#file-interface)
- [filtering](#filtering)
  - [check](#check)
  - [refine](#refine)
  - [refine (interface)](#refine-interface)
- [guards](#guards)
  - [asserts](#asserts)
  - [is](#is)
  - [isSchema](#isschema)
  - [isSchemaError](#isschemaerror)
- [instances](#instances)
  - [overrideToEquivalence](#overridetoequivalence)
  - [toEquivalence](#toequivalence)
- [models](#models)
  - [$Array (interface)](#array-interface)
  - [$Record (interface)](#record-interface)
  - [Any (interface)](#any-interface)
  - [BigInt (interface)](#bigint-interface)
  - [Boolean (interface)](#boolean-interface)
  - [Bottom (interface)](#bottom-interface)
  - [Class (interface)](#class-interface)
  - [Codec (interface)](#codec-interface)
  - [Constraint (interface)](#constraint-interface)
  - [ConstraintCodec (interface)](#constraintcodec-interface)
  - [ConstraintDecoder (interface)](#constraintdecoder-interface)
  - [ConstraintEncoder (interface)](#constraintencoder-interface)
  - [ConstraintRebuildable (interface)](#constraintrebuildable-interface)
  - [ConstructorDefault (type alias)](#constructordefault-type-alias)
  - [Enum (interface)](#enum-interface)
  - [FilterIssue (type alias)](#filterissue-type-alias)
  - [FilterOutput (type alias)](#filteroutput-type-alias)
  - [Json (type alias)](#json-type-alias)
  - [JsonArray (interface)](#jsonarray-interface)
  - [JsonObject (interface)](#jsonobject-interface)
  - [Literal (interface)](#literal-interface)
  - [Literals (interface)](#literals-interface)
  - [Mutability (type alias)](#mutability-type-alias)
  - [MutableJson (type alias)](#mutablejson-type-alias)
  - [MutableJsonArray (interface)](#mutablejsonarray-interface)
  - [MutableJsonObject (interface)](#mutablejsonobject-interface)
  - [Never (interface)](#never-interface)
  - [NonEmptyArray (interface)](#nonemptyarray-interface)
  - [Null (interface)](#null-interface)
  - [NullOr (interface)](#nullor-interface)
  - [NullishOr (interface)](#nullishor-interface)
  - [Number (interface)](#number-interface)
  - [ObjectKeyword (interface)](#objectkeyword-interface)
  - [Opaque (interface)](#opaque-interface)
  - [Optic (interface)](#optic-interface)
  - [Optionality (type alias)](#optionality-type-alias)
  - [Schema (interface)](#schema-interface)
  - [String (interface)](#string-interface)
  - [Struct (interface)](#struct-interface)
  - [StructWithRest (interface)](#structwithrest-interface)
  - [Symbol (interface)](#symbol-interface)
  - [TaggedStruct (type alias)](#taggedstruct-type-alias)
  - [TaggedUnion (interface)](#taggedunion-interface)
  - [TemplateLiteral (interface)](#templateliteral-interface)
  - [TemplateLiteralParser (interface)](#templateliteralparser-interface)
  - [Top (interface)](#top-interface)
  - [Tuple (interface)](#tuple-interface)
  - [TupleWithRest (interface)](#tuplewithrest-interface)
  - [Undefined (interface)](#undefined-interface)
  - [UndefinedOr (interface)](#undefinedor-interface)
  - [Union (interface)](#union-interface)
  - [UniqueArray (interface)](#uniquearray-interface)
  - [UniqueSymbol (interface)](#uniquesymbol-interface)
  - [Unknown (interface)](#unknown-interface)
  - [UnknownFromJsonString (interface)](#unknownfromjsonstring-interface)
  - [Void (interface)](#void-interface)
  - [WithoutConstructorDefault (interface)](#withoutconstructordefault-interface)
  - [fromJsonString (interface)](#fromjsonstring-interface)
  - [instanceOf (interface)](#instanceof-interface)
  - [mutableKey (interface)](#mutablekey-interface)
  - [optional (interface)](#optional-interface)
  - [optionalKey (interface)](#optionalkey-interface)
  - [suspend (interface)](#suspend-interface)
- [options](#options)
  - [DecodingDefaultOptions (type alias)](#decodingdefaultoptions-type-alias)
  - [ErrorOptions (interface)](#erroroptions-interface)
  - [MakeOptions (interface)](#makeoptions-interface)
  - [ToJsonSchemaOptions (interface)](#tojsonschemaoptions-interface)
- [schemas](#schemas)
  - [Any](#any)
  - [BigInt](#bigint-1)
  - [Json](#json)
  - [MutableJson](#mutablejson)
  - [Never](#never)
  - [Null](#null)
  - [Number](#number-1)
  - [ObjectKeyword](#objectkeyword)
  - [Result](#result)
  - [Result (interface)](#result-interface)
  - [ResultIso (type alias)](#resultiso-type-alias)
  - [String](#string)
  - [Symbol](#symbol)
  - [Undefined](#undefined)
  - [Unknown](#unknown)
  - [UnknownFromJsonString](#unknownfromjsonstring)
  - [Void](#void)
- [search params](#search-params)
  - [URLSearchParams](#urlsearchparams)
  - [URLSearchParams (interface)](#urlsearchparams-interface)
  - [fromURLSearchParams (interface)](#fromurlsearchparams-interface)
- [string](#string-1)
  - [Char](#char)
  - [Char (interface)](#char-interface)
  - [NonEmptyString](#nonemptystring)
  - [NonEmptyString (interface)](#nonemptystring-interface)
  - [StringFromBase64](#stringfrombase64)
  - [StringFromBase64 (interface)](#stringfrombase64-interface)
  - [StringFromBase64Url](#stringfrombase64url)
  - [StringFromBase64Url (interface)](#stringfrombase64url-interface)
  - [StringFromHex](#stringfromhex)
  - [StringFromHex (interface)](#stringfromhex-interface)
  - [StringFromUriComponent](#stringfromuricomponent)
  - [StringFromUriComponent (interface)](#stringfromuricomponent-interface)
  - [Trim](#trim)
  - [Trim (interface)](#trim-interface)
  - [Trimmed](#trimmed)
  - [Trimmed (interface)](#trimmed-interface)
- [transforming](#transforming)
  - [compose (interface)](#compose-interface)
  - [decode](#decode)
  - [decodeTo](#decodeto)
  - [decodeTo (interface)](#decodeto-interface)
  - [encode](#encode)
  - [encodeKeys](#encodekeys)
  - [encodeKeys (interface)](#encodekeys-interface)
  - [encodeTo](#encodeto)
  - [extendTo](#extendto)
  - [flip](#flip)
  - [flip (interface)](#flip-interface)
  - [link](#link)
  - [mutable](#mutable)
  - [mutable (interface)](#mutable-interface)
  - [toEncoded](#toencoded)
  - [toEncoded (interface)](#toencoded-interface)
  - [toType](#totype)
  - [toType (interface)](#totype-interface)
- [utility types](#utility-types)
  - [BottomLazy (interface)](#bottomlazy-interface)
  - [revealBottom](#revealbottom)
  - [revealCodec](#revealcodec)
- [utils](#utils)
  - [Annotations (namespace)](#annotations-namespace)
    - [Annotations (interface)](#annotations-interface)
    - [Augment (interface)](#augment-interface)
    - [Documentation (interface)](#documentation-interface)
    - [Key (interface)](#key-interface)
    - [Bottom (interface)](#bottom-interface-1)
    - [Declaration (interface)](#declaration-interface)
    - [Filter (interface)](#filter-interface)
    - [Issue (interface)](#issue-interface)
    - [BuiltInMetaDefinitions (interface)](#builtinmetadefinitions-interface)
    - [MetaDefinitions (interface)](#metadefinitions-interface)
    - [BuiltInMeta (type alias)](#builtinmeta-type-alias)
    - [Meta (type alias)](#meta-type-alias)
    - [TypeParameters (namespace)](#typeparameters-namespace)
      - [Type (type alias)](#type-type-alias)
      - [Encoded (type alias)](#encoded-type-alias)
    - [ToArbitrary (namespace)](#toarbitrary-namespace)
      - [Filter (interface)](#filter-interface-1)
      - [Candidate (interface)](#candidate-interface)
      - [OrderedConstraint (interface)](#orderedconstraint-interface)
      - [GenerationConstraint (interface)](#generationconstraint-interface)
      - [Recursion (interface)](#recursion-interface)
      - [Context (interface)](#context-interface)
      - [TypeParameter (interface)](#typeparameter-interface)
      - [Derivation (interface)](#derivation-interface)
      - [Declaration (interface)](#declaration-interface-1)
      - [WithReport (interface)](#withreport-interface)
      - [Report (interface)](#report-interface)
      - [OpaqueFilterWarning (interface)](#opaquefilterwarning-interface)
      - [Output (type alias)](#output-type-alias)
      - [Warning (type alias)](#warning-type-alias)
    - [ToFormatter (namespace)](#toformatter-namespace)
      - [Declaration (interface)](#declaration-interface-2)
    - [ToEquivalence (namespace)](#toequivalence-namespace)
      - [Declaration (interface)](#declaration-interface-3)
  - [Codec (namespace)](#codec-namespace)
    - [Encoded (type alias)](#encoded-type-alias-1)
    - [DecodingServices (type alias)](#decodingservices-type-alias)
    - [EncodingServices (type alias)](#encodingservices-type-alias)
  - [Record (namespace)](#record-namespace)
    - [Key (interface)](#key-interface-1)
    - [Type (type alias)](#type-type-alias-1)
    - [Iso (type alias)](#iso-type-alias)
    - [Encoded (type alias)](#encoded-type-alias-2)
    - [DecodingServices (type alias)](#decodingservices-type-alias-1)
    - [EncodingServices (type alias)](#encodingservices-type-alias-1)
    - [MakeIn (type alias)](#makein-type-alias)
  - [Schema (namespace)](#schema-namespace)
    - [Type (type alias)](#type-type-alias-2)
  - [Struct (namespace)](#struct-namespace)
    - [Fields (type alias)](#fields-type-alias)
    - [Type (type alias)](#type-type-alias-3)
    - [Iso (type alias)](#iso-type-alias-1)
    - [Encoded (type alias)](#encoded-type-alias-3)
    - [DecodingServices (type alias)](#decodingservices-type-alias-2)
    - [EncodingServices (type alias)](#encodingservices-type-alias-2)
    - [MakeIn (type alias)](#makein-type-alias-1)
  - [StructWithRest (namespace)](#structwithrest-namespace)
    - [Objects (type alias)](#objects-type-alias)
    - [Records (type alias)](#records-type-alias)
    - [Type (type alias)](#type-type-alias-4)
    - [Iso (type alias)](#iso-type-alias-2)
    - [Encoded (type alias)](#encoded-type-alias-4)
    - [MakeIn (type alias)](#makein-type-alias-2)
    - [DecodingServices (type alias)](#decodingservices-type-alias-3)
    - [EncodingServices (type alias)](#encodingservices-type-alias-3)
    - [ValidateRecords (type alias)](#validaterecords-type-alias)
  - [TemplateLiteral (namespace)](#templateliteral-namespace)
    - [SchemaPart (interface)](#schemapart-interface)
    - [LiteralPart (type alias)](#literalpart-type-alias)
    - [Part (type alias)](#part-type-alias)
    - [Parts (type alias)](#parts-type-alias)
    - [Encoded (type alias)](#encoded-type-alias-5)
  - [TemplateLiteralParser (namespace)](#templateliteralparser-namespace)
    - [Type (type alias)](#type-type-alias-5)
  - [Tuple (namespace)](#tuple-namespace)
    - [Elements (type alias)](#elements-type-alias)
    - [Type (type alias)](#type-type-alias-6)
    - [Iso (type alias)](#iso-type-alias-3)
    - [Encoded (type alias)](#encoded-type-alias-6)
    - [DecodingServices (type alias)](#decodingservices-type-alias-4)
    - [EncodingServices (type alias)](#encodingservices-type-alias-4)
    - [MakeIn (type alias)](#makein-type-alias-3)
  - [TupleWithRest (namespace)](#tuplewithrest-namespace)
    - [TupleType (type alias)](#tupletype-type-alias)
    - [Rest (type alias)](#rest-type-alias)
    - [Type (type alias)](#type-type-alias-7)
    - [Iso (type alias)](#iso-type-alias-4)
    - [Encoded (type alias)](#encoded-type-alias-7)
    - [MakeIn (type alias)](#makein-type-alias-4)

---

# Arbitrary

## LazyArbitrary (type alias)

A thunk that, given the `fast-check` module, returns an `Arbitrary<T>`.
Use this type when you need to defer instantiation of the arbitrary, for
example to support recursive schemas.

**Signature**

```ts
type LazyArbitrary<T> = (fc: typeof FastCheck) => FastCheck.Arbitrary<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12906)

Since v4.0.0

## toArbitrary

Derives a `fast-check` `Arbitrary` from a schema for property-based
testing. The derived arbitrary generates values that satisfy the schema.

**Details**

Constraints refine base generators; candidates add weighted sources while
filters still validate every value. `{ report: true }` returns warnings such
as `OpaqueFilter`, while derivation errors remain fail-fast. Recursive
schemas use terminal branches and fail when no finite terminal path exists.

**Example** (Generating arbitrary values)

```ts
import { Schema } from "effect"
import * as FastCheck from "fast-check"

const PersonArb = Schema.toArbitrary(Schema.Struct({ name: Schema.String, age: Schema.Number }))

// Sample a random value
const sample = FastCheck.sample(PersonArb, 1)[0]
console.log(typeof sample.name) // "string"
```

**Signature**

```ts
declare const toArbitrary: {
  <S extends Constraint>(schema: S): FastCheck.Arbitrary<S["Type"]>
  <S extends Constraint>(
    schema: S,
    options: { readonly report: true }
  ): Annotations.ToArbitrary.WithReport<FastCheck.Arbitrary<S["Type"]>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12961)

Since v4.0.0

## toArbitraryLazy

Derives a `LazyArbitrary` from a schema. The result is memoized so
repeated calls with the same schema are cheap.

**Details**

Prefer `toArbitrary` when you need the arbitrary directly, or when you
want derivation diagnostics via `{ report: true }`. Unsupported schema
nodes, impossible constraints, invalid candidates, and recursive schemas
without a finite terminal path fail immediately.

**Signature**

```ts
declare const toArbitraryLazy: <S extends Constraint>(schema: S) => LazyArbitrary<S["Type"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12922)

Since v4.0.0

# Array checks

## isUnique

Validates that all items in an array are unique according to Effect equality.

**Details**

JSON Schema:
This check corresponds to the `uniqueItems: true` constraint in JSON Schema.

Arbitrary:
When generating test data with fast-check, this applies a node-local
`unique: true` constraint. Array generators translate it to `fast-check`
`uniqueArray` using Effect equality.

**Signature**

```ts
declare const isUnique: <T>(annotations?: Annotations.Filter) => SchemaAST.Filter<ReadonlyArray<T>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8374)

Since v4.0.0

# BigDecimal

## BigDecimal

Schema for `BigDecimal` values.

**When to use**

Use when you already have Effect decimal instances and need schema
validation, formatting, equivalence, and JSON string serialization.

**Details**

Default JSON serializer:

- encodes `BigDecimal` as a `string`

**See**

- `BigDecimalFromString` for parsing string input into a BigDecimal

**Signature**

```ts
declare const BigDecimal: BigDecimal
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10784)

Since v3.10.0

## BigDecimal (interface)

Type-level representation of `BigDecimal`.

**Signature**

```ts
export interface BigDecimal extends declare<BigDecimal_.BigDecimal> {
  readonly Rebuild: BigDecimal
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10684)

Since v3.10.0

## BigDecimalFromString

Schema that parses a string into a `BigDecimal`.

**When to use**

Use to parse decimal or exponent-notation strings into arbitrary-precision
BigDecimal values while encoding them back to strings.

**Details**

Decoding:

- A `string` is decoded with `BigDecimal.fromString`.

Encoding:

- A `BigDecimal` is encoded with `BigDecimal.format`.

**Gotchas**

An empty string decodes as zero.

**See**

- `BigDecimal` for validating values that are already BigDecimal values
- `BigIntFromString` for parsing base-10 integer strings into bigint values
- `NumberFromString` for parsing JavaScript number strings

**Signature**

```ts
declare const BigDecimalFromString: BigDecimalFromString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10860)

Since v4.0.0

## BigDecimalFromString (interface)

Type-level representation of `BigDecimalFromString`.

**Signature**

```ts
export interface BigDecimalFromString extends decodeTo<BigDecimal, String> {
  readonly Rebuild: BigDecimalFromString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10829)

Since v4.0.0

# BigDecimal checks

## isBetweenBigDecimal

Validates that a `BigDecimal` is within a specified range.

**Details**

The minimum and maximum boundaries are inclusive by default. Pass
`exclusiveMinimum` or `exclusiveMaximum` to exclude either boundary.

**Signature**

```ts
declare const isBetweenBigDecimal: (
  options: {
    readonly minimum: BigDecimal_.BigDecimal
    readonly maximum: BigDecimal_.BigDecimal
    readonly exclusiveMinimum?: boolean | undefined
    readonly exclusiveMaximum?: boolean | undefined
  },
  annotations?: Annotations.Filter
) => SchemaAST.Filter<BigDecimal_.BigDecimal>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7891)

Since v4.0.0

## isGreaterThanBigDecimal

Validates that a BigDecimal is greater than the specified value (exclusive).

**Signature**

```ts
declare const isGreaterThanBigDecimal: (
  exclusiveMinimum: BigDecimal_.BigDecimal,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<BigDecimal_.BigDecimal>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7840)

Since v4.0.0

## isGreaterThanOrEqualToBigDecimal

Validates that a BigDecimal is greater than or equal to the specified value
(inclusive).

**Signature**

```ts
declare const isGreaterThanOrEqualToBigDecimal: (
  minimum: BigDecimal_.BigDecimal,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<BigDecimal_.BigDecimal>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7852)

Since v4.0.0

## isLessThanBigDecimal

Validates that a BigDecimal is less than the specified value (exclusive).

**Signature**

```ts
declare const isLessThanBigDecimal: (
  exclusiveMaximum: BigDecimal_.BigDecimal,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<BigDecimal_.BigDecimal>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7863)

Since v4.0.0

## isLessThanOrEqualToBigDecimal

Validates that a BigDecimal is less than or equal to the specified value
(inclusive).

**Signature**

```ts
declare const isLessThanOrEqualToBigDecimal: (
  maximum: BigDecimal_.BigDecimal,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<BigDecimal_.BigDecimal>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7875)

Since v4.0.0

# BigInt

## BigIntFromString

Schema that parses a string into a `bigint`.

**When to use**

Use to parse signed base-10 integer strings into bigint values while encoding
bigint values back to decimal strings.

**Details**

Decoding:

- A `string` is decoded as a `bigint`.

Encoding:

- A `bigint` is encoded as a `string`.

**Gotchas**

Decoding accepts only strings matching `^-?\d+$`.

**See**

- `isStringBigInt` for the string predicate used by this schema
- `BigInt` for validating values that are already bigint values
- `NumberFromString` for parsing JavaScript number strings, including non-finite values
- `BigDecimalFromString` for parsing decimal number strings

**Signature**

```ts
declare const BigIntFromString: BigIntFromString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11489)

Since v4.0.0

## BigIntFromString (interface)

Type-level representation of `BigIntFromString`.

**Signature**

```ts
export interface BigIntFromString extends decodeTo<BigInt, String> {
  readonly Rebuild: BigIntFromString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11457)

Since v4.0.0

# BigInt checks

## isBetweenBigInt

Validates that a BigInt is within a specified range. The range boundaries can
be inclusive or exclusive based on the provided options.

**Details**

Arbitrary:

When generating test data with fast-check, this applies `min` and `max`
constraints to ensure generated BigInt values fall within the specified
range.

**Signature**

```ts
declare const isBetweenBigInt: (
  options: {
    readonly minimum: bigint
    readonly maximum: bigint
    readonly exclusiveMinimum?: boolean | undefined
    readonly exclusiveMaximum?: boolean | undefined
  },
  annotations?: Annotations.Filter
) => SchemaAST.Filter<bigint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7824)

Since v4.0.0

## isGreaterThanBigInt

Validates that a BigInt is greater than the specified value (exclusive).

**Details**

Arbitrary:

When generating test data with fast-check, this applies a `min` constraint of
`exclusiveMinimum + 1n` to ensure generated BigInts are greater than the
specified value.

**Signature**

```ts
declare const isGreaterThanBigInt: (
  exclusiveMinimum: bigint,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<bigint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7725)

Since v4.0.0

## isGreaterThanOrEqualToBigInt

Validates that a BigInt is greater than or equal to the specified value
(inclusive).

**Details**

Arbitrary:

When generating test data with fast-check, this applies a `min` constraint
to ensure generated BigInt values are greater than or equal to the specified
value.

**Signature**

```ts
declare const isGreaterThanOrEqualToBigInt: (
  minimum: bigint,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<bigint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7750)

Since v4.0.0

## isLessThanBigInt

Validates that a BigInt is less than the specified value (exclusive).

**Details**

Arbitrary:

When generating test data with fast-check, this applies a `max` constraint of
`exclusiveMaximum - 1n` to ensure generated BigInts are less than the
specified value.

**Signature**

```ts
declare const isLessThanBigInt: (exclusiveMaximum: bigint, annotations?: Annotations.Filter) => SchemaAST.Filter<bigint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7774)

Since v4.0.0

## isLessThanOrEqualToBigInt

Validates that a BigInt is less than or equal to the specified value
(inclusive).

**Details**

Arbitrary:

When generating test data with fast-check, this applies a `max` constraint
to ensure generated BigInt values are less than or equal to the specified
value.

**Signature**

```ts
declare const isLessThanOrEqualToBigInt: (maximum: bigint, annotations?: Annotations.Filter) => SchemaAST.Filter<bigint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7799)

Since v4.0.0

# Canonical Codecs

## StringTree (type alias)

A `Tree` of `string | undefined` nodes. Leaf values are either a
string representation or `undefined` for opaque/declaration types.

**Signature**

```ts
type StringTree = Tree<string | undefined>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13463)

Since v4.0.0

## toCodecArrayFromSingle

Allows array schemas to decode from either an array input or a single value
input.

**When to use**

Use when you need to accept transport formats that may represent a
single-item array as a bare value, such as query-string or form-data adapters.

**Gotchas**

This combinator is intentionally not part of `toCodecStringTree`; it adds a
decoding convenience rather than a canonical StringTree representation. It
does not parse comma-separated strings.

**Signature**

```ts
declare const toCodecArrayFromSingle: <S extends Constraint>(schema: S) => toCodecArrayFromSingle<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13554)

Since v4.0.0

## toCodecArrayFromSingle (interface)

Type-level representation returned by `toCodecArrayFromSingle`.

**Signature**

```ts
export interface toCodecArrayFromSingle<S extends Constraint> extends BottomLazy<
  S["ast"],
  toCodecArrayFromSingle<S>,
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"]
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13515)

Since v4.0.0

## toCodecIso

Derives an isomorphism codec from a schema. The encoded form is the
schema's `Iso` type — the intermediate representation used for round-tripping.

**Signature**

```ts
declare const toCodecIso: <S extends Constraint>(schema: S) => Codec<S["Type"], S["Iso"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13427)

Since v4.0.0

## toCodecJson

Derives a canonical JSON codec from a schema. The encoded form is `Json`, and
decoding produces the schema's `Type`.

**Signature**

```ts
declare const toCodecJson: <S extends Constraint>(schema: S) => toCodecJson<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13356)

Since v4.0.0

## toCodecJson (interface)

Type-level representation returned by `toCodecJson`.

**Signature**

```ts
export interface toCodecJson<S extends Constraint> extends BottomLazy<
  S["ast"],
  toCodecJson<S>,
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"]
  readonly Encoded: Json
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13327)

Since v4.0.0

## toCodecStringTree

Converts a schema to the StringTree canonical codec, where every leaf value
becomes a string while preserving the original structure.

**Details**

Declarations are converted to `undefined` (unless they have a
`toCodecJson` or `toCodec` annotation).

**Signature**

```ts
declare const toCodecStringTree: <S extends Constraint>(schema: S) => toCodecStringTree<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13505)

Since v4.0.0

## toCodecStringTree (interface)

Type-level representation returned by `toCodecStringTree`.

**Signature**

```ts
export interface toCodecStringTree<S extends Constraint> extends BottomLazy<
  S["ast"],
  toCodecStringTree<S>,
  ReadonlyArray<Constraint>,
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"]
  readonly Encoded: StringTree
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13471)

Since v4.0.0

## toEncoderXml

Derives an XML encoder from a codec.

**Details**

The returned function encodes a value through `toCodecStringTree` and returns
an `Effect` that succeeds with the XML string or fails with `SchemaError` if
codec encoding fails.

**Signature**

```ts
declare const toEncoderXml: <T, E, RD, RE>(
  codec: Codec<T, E, RD, RE>,
  options?: XmlEncoderOptions
) => (t: T) => Effect.Effect<string, SchemaError, RE>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13583)

Since v4.0.0

# Cause

## Cause

Creates a schema for `Cause` values using separate schemas for typed failures
and unexpected defects.

**When to use**

Use to validate, transform, or serialize Effect failure causes when typed
failures and unexpected defects need separate schemas.

**Details**

The `error` schema is applied to `Fail` reasons and the `defect` schema is
applied to `Die` reasons. Interrupt reasons do not use either schema and
carry only an optional fiber id.

**See**

- `CauseReason` for the schema used by each individual cause reason
- `CauseIso` for the ordered array representation used by the schema ISO

**Signature**

```ts
declare const Cause: <E extends Constraint, D extends Constraint>(error: E, defect: D) => Cause<E, D>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9260)

Since v3.10.0

## Cause (interface)

Type-level representation returned by `Cause`.

**Signature**

```ts
export interface Cause<E extends Constraint, D extends Constraint> extends declareConstructor<
  Cause_.Cause<E["Type"]>,
  Cause_.Cause<E["Encoded"]>,
  readonly [E, D],
  CauseIso<E, D>
> {
  readonly Rebuild: Cause<E, D>
  readonly error: E
  readonly defect: D
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9209)

Since v3.10.0

## CauseIso (type alias)

Iso representation used for `Cause` schemas: an ordered array of
`CauseReasonIso` values.

**When to use**

Use when working with the ISO shape of a `Cause` schema, such as `toIso`
optics or codecs that expose a cause as its ordered array of encoded reasons.

**See**

- `Cause` for constructing schemas for full Cause values
- `CauseReasonIso` for the ISO shape of each array element

**Signature**

```ts
type CauseIso<E, D> = ReadonlyArray<CauseReasonIso<E, D>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9237)

Since v4.0.0

# CauseReason

## CauseReason

Creates a schema for `Cause.Reason` values using separate schemas for typed
failures and unexpected defects.

**When to use**

Use when serializing or decoding individual cause reasons separately from a
full failure cause, with distinct schemas for typed errors and defects.

**Details**

`Fail` reasons use the `error` schema, `Die` reasons use the `defect` schema,
and `Interrupt` reasons carry only an optional fiber id.

**See**

- `Cause` for constructing schemas for full Cause values
- `CauseReasonIso` for the ISO shape of each cause reason

**Signature**

```ts
declare const CauseReason: <E extends Constraint, D extends Constraint>(error: E, defect: D) => CauseReason<E, D>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9091)

Since v4.0.0

## CauseReason (interface)

Type-level representation returned by `CauseReason`.

**Signature**

```ts
export interface CauseReason<E extends Constraint, D extends Constraint> extends declareConstructor<
  Cause_.Reason<E["Type"]>,
  Cause_.Reason<E["Encoded"]>,
  readonly [E, D],
  CauseReasonIso<E, D>
> {
  readonly Rebuild: CauseReason<E, D>
  readonly error: E
  readonly defect: D
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9036)

Since v4.0.0

## CauseReasonIso (type alias)

Iso representation used for `CauseReason` schemas.

**Details**

Failures are represented with a `Fail` tag and encoded error, defects with a
`Die` tag and encoded defect, and interrupts with an optional `fiberId`.

**Signature**

```ts
type CauseReasonIso<E, D> =
  | {
      readonly _tag: "Fail"
      readonly error: E["Iso"]
    }
  | {
      readonly _tag: "Die"
      readonly error: D["Iso"]
    }
  | {
      readonly _tag: "Interrupt"
      readonly fiberId: number | undefined
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9060)

Since v4.0.0

# Chunk

## Chunk

Schema for chunks whose values conform to the provided element schema.

**Signature**

```ts
declare const Chunk: <Value extends Constraint>(value: Value) => Chunk<Value>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10131)

Since v3.10.0

## Chunk (interface)

Type-level representation returned by `Chunk`.

**Signature**

```ts
export interface Chunk<Value extends Constraint> extends declareConstructor<
  Chunk_.Chunk<Value["Type"]>,
  Chunk_.Chunk<Value["Encoded"]>,
  readonly [Value],
  ChunkIso<Value>
> {
  readonly Rebuild: Chunk<Value>
  readonly value: Value
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10097)

Since v3.10.0

## ChunkIso (type alias)

Iso representation used for `Chunk` schemas: an array of element values using
the element schema's `Iso` type.

**When to use**

Use when annotating type-level helpers that work with the readonly-array ISO
shape of a `Chunk` schema.

**See**

- `Chunk` for the schema interface and constructor that use this ISO representation

**Signature**

```ts
type ChunkIso<Value> = ReadonlyArray<Value["Iso"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10123)

Since v4.0.0

# Date

## Date

Schema for JavaScript `Date` objects.

**When to use**

Use to validate in-memory values that must already be JavaScript date
objects.

**Details**

This schema accepts any `Date` instance, including invalid dates. The default
JSON serializer encodes valid dates as ISO 8601 strings; invalid dates encode
as `"Invalid Date"`.

**Example** (Defining a Date schema)

```ts
import { Schema } from "effect"

Schema.decodeUnknownSync(Schema.Date)(new Date("2024-01-01"))
// => Date { 2024-01-01T00:00:00.000Z }
```

**See**

- `DateValid` for accepting only valid Date instances

**Signature**

```ts
declare const Date: Date
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10406)

Since v4.0.0

## Date (interface)

Type-level representation of `Date`.

**Signature**

```ts
export interface Date extends instanceOf<globalThis.Date> {
  readonly Rebuild: Date
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10340)

Since v4.0.0

## DateFromString

Schema that decodes a string into a JavaScript `Date`.

**When to use**

Use to model string-encoded dates that decode to JavaScript `Date` objects
and encode back to strings.

**Details**

Decoding:
The string is passed to JavaScript `Date` construction.

Encoding:
A valid `Date` is encoded as an ISO string; an invalid `Date` is encoded as
`"Invalid Date"`.

**Gotchas**

Invalid date strings can decode to invalid `Date` instances.

**See**

- `Date` for accepting Date instances directly
- `DateValid` for rejecting invalid Date instances

**Signature**

```ts
declare const DateFromString: DateFromString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10467)

Since v3.10.0

## DateFromString (interface)

Type-level representation of `DateFromString`.

**Signature**

```ts
export interface DateFromString extends decodeTo<Date, String> {
  readonly Rebuild: DateFromString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10436)

Since v3.10.0

## DateValid

Schema for **valid** JavaScript `Date` objects.

**Details**

This schema accepts `Date` instances but rejects invalid dates (such as `new
Date("invalid")`).

**Signature**

```ts
declare const DateValid: DateValid
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10490)

Since v4.0.0

## DateValid (interface)

Type-level representation of `DateValid`.

**Signature**

```ts
export interface DateValid extends Date {
  readonly Rebuild: DateValid
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10475)

Since v4.0.0

# Date checks

## isBetweenDate

Validates that a Date is within a specified range. The range boundaries can
be inclusive or exclusive based on the provided options.

**Details**

JSON Schema:

This check does not have a direct JSON Schema equivalent, as JSON Schema
validates date strings, not Date objects.

Arbitrary:

When generating test data with fast-check, this applies `min` and `max`
constraints to ensure generated Date objects fall within the specified range,
shifting exclusive bounds by one millisecond.

**Signature**

```ts
declare const isBetweenDate: (
  options: {
    readonly minimum: globalThis.Date
    readonly maximum: globalThis.Date
    readonly exclusiveMinimum?: boolean | undefined
    readonly exclusiveMaximum?: boolean | undefined
  },
  annotations?: Annotations.Filter
) => SchemaAST.Filter<globalThis.Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7701)

Since v4.0.0

## isDateValid

Validates that a Date object represents a valid date (not an invalid date
like `new Date("invalid")`).

**Details**

JSON Schema:

This check does not have a direct JSON Schema equivalent, as JSON Schema
validates date strings, not Date objects.

Arbitrary:

When generating test data with fast-check, this applies a `valid: true`
constraint to ensure generated Date objects are valid.

**Signature**

```ts
declare const isDateValid: (annotations?: Annotations.Filter) => SchemaAST.Filter<globalThis.Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7555)

Since v4.0.0

## isGreaterThanDate

Validates that a Date is greater than the specified value (exclusive).

**Details**

Arbitrary:

When generating test data with fast-check, this applies a `min` constraint of
one millisecond after the specified value to ensure generated Date objects are
greater than it.

**Signature**

```ts
declare const isGreaterThanDate: (
  exclusiveMinimum: globalThis.Date,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<globalThis.Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7587)

Since v4.0.0

## isGreaterThanOrEqualToDate

Validates that a Date is greater than or equal to the specified date
(inclusive).

**Details**

JSON Schema:

This check does not have a direct JSON Schema equivalent, as JSON Schema
validates date strings, not Date objects.

Arbitrary:

When generating test data with fast-check, this applies a `min` constraint
to ensure generated Date objects are greater than or equal to the specified
date.

**Signature**

```ts
declare const isGreaterThanOrEqualToDate: (
  minimum: globalThis.Date,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<globalThis.Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7617)

Since v4.0.0

## isLessThanDate

Validates that a Date is less than the specified value (exclusive).

**Details**

Arbitrary:

When generating test data with fast-check, this applies a `max` constraint of
one millisecond before the specified value to ensure generated Date objects
are less than it.

**Signature**

```ts
declare const isLessThanDate: (
  exclusiveMaximum: globalThis.Date,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<globalThis.Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7641)

Since v4.0.0

## isLessThanOrEqualToDate

Validates that a Date is less than or equal to the specified date
(inclusive).

**Details**

JSON Schema:

This check does not have a direct JSON Schema equivalent, as JSON Schema
validates date strings, not Date objects.

Arbitrary:

When generating test data with fast-check, this applies a `max` constraint
to ensure generated Date objects are less than or equal to the specified
date.

**Signature**

```ts
declare const isLessThanOrEqualToDate: (
  maximum: globalThis.Date,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<globalThis.Date>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7671)

Since v4.0.0

# DateTime

## DateTimeUtc

Schema for `DateTime.Utc` values.

**When to use**

Use to validate existing `DateTime.Utc` schema values and use the default JSON
codec that represents them as UTC ISO strings.

**Details**

The default JSON codec decodes UTC ISO strings into `DateTime.Utc` values and
encodes `DateTime.Utc` values as UTC ISO strings.

**See**

- `DateTimeUtcFromString` for decoding date-time strings into UTC values
- `DateTimeUtcFromDate` for decoding JavaScript Date values into UTC values
- `DateTimeUtcFromMillis` for decoding epoch milliseconds into UTC values
- `DateTimeZoned` for preserving zoned DateTime values

**Signature**

```ts
declare const DateTimeUtc: DateTimeUtc
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11917)

Since v3.10.0

## DateTimeUtc (interface)

Type-level representation of `DateTimeUtc`.

**Signature**

```ts
export interface DateTimeUtc extends declare<DateTime.Utc> {
  readonly Rebuild: DateTimeUtc
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11892)

Since v3.10.0

## DateTimeUtcFromDate

Schema that decodes a `Date` into a `DateTime.Utc`.

**When to use**

Use when you need to decode valid JavaScript `Date` objects into
`DateTime.Utc` values.

**Details**

Decoding:

- A **valid** `Date` is decoded as a `DateTime.Utc`

Encoding:

- A `DateTime.Utc` is encoded as a `Date`

**See**

- `DateTimeUtc` for validating values that are already `DateTime.Utc`
- `DateTimeUtcFromString` for decoding date-time strings into UTC values
- `DateTimeUtcFromMillis` for decoding epoch milliseconds into UTC values
- `DateValid` for validating Date instances without converting them

**Signature**

```ts
declare const DateTimeUtcFromDate: DateTimeUtcFromDate
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11981)

Since v3.12.0

## DateTimeUtcFromDate (interface)

Type-level representation of `DateTimeUtcFromDate`.

**Signature**

```ts
export interface DateTimeUtcFromDate extends decodeTo<DateTimeUtc, Date> {
  readonly Rebuild: DateTimeUtcFromDate
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11953)

Since v3.12.0

## DateTimeUtcFromMillis

Schema that decodes a number into a `DateTime.Utc`.

**Details**

Decoding:

- A number of milliseconds since the Unix epoch is decoded as a `DateTime.Utc`

Encoding:

- A `DateTime.Utc` is encoded as a number of milliseconds since the Unix epoch.

**Signature**

```ts
declare const DateTimeUtcFromMillis: DateTimeUtcFromMillis
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12048)

Since v4.0.0

## DateTimeUtcFromMillis (interface)

Type-level representation of `DateTimeUtcFromMillis`.

**Signature**

```ts
export interface DateTimeUtcFromMillis extends decodeTo<instanceOf<DateTime.Utc>, Number> {
  readonly Rebuild: DateTimeUtcFromMillis
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12030)

Since v4.0.0

## DateTimeUtcFromString

Schema that decodes a date-time string into a `DateTime.Utc`.

**Details**

Decoding:

- A string accepted by `DateTime.make` is parsed and normalized to UTC. Strings
  without an explicit zone are interpreted as UTC.

Encoding:

- A `DateTime.Utc` is encoded as a UTC ISO 8601 string.

**Signature**

```ts
declare const DateTimeUtcFromString: DateTimeUtcFromString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12015)

Since v4.0.0

## DateTimeUtcFromString (interface)

Type-level representation of `DateTimeUtcFromString`.

**Signature**

```ts
export interface DateTimeUtcFromString extends decodeTo<DateTimeUtc, String> {
  readonly Rebuild: DateTimeUtcFromString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11994)

Since v4.0.0

## DateTimeZoned

Schema for `DateTime.Zoned` values.

**Details**

Default JSON serializer:

- encodes offset zones as an ISO date-time with a numeric offset, such as
  `YYYY-MM-DDTHH:mm:ss.sss+HH:MM`
- encodes named zones by appending the IANA identifier in brackets, such as
  `YYYY-MM-DDTHH:mm:ss.sss+HH:MM[Time/Zone]`

**Signature**

```ts
declare const DateTimeZoned: DateTimeZoned
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12296)

Since v3.10.0

## DateTimeZoned (interface)

Type-level representation of `DateTimeZoned`.

**Signature**

```ts
export interface DateTimeZoned extends declare<DateTime.Zoned> {
  readonly Rebuild: DateTimeZoned
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12273)

Since v3.10.0

## DateTimeZonedFromString

Schema that parses a zoned DateTime string into a `DateTime.Zoned`.

**Details**

Decoding:

- A `string` (e.g. `2024-01-01T00:00:00.000+00:00[Europe/London]`) is decoded as a `DateTime.Zoned`.

Encoding:

- A `DateTime.Zoned` is encoded as a `string`.

**Signature**

```ts
declare const DateTimeZonedFromString: DateTimeZonedFromString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12356)

Since v4.0.0

## DateTimeZonedFromString (interface)

Type-level representation of `DateTimeZonedFromString`.

**Signature**

```ts
export interface DateTimeZonedFromString extends decodeTo<DateTimeZoned, String> {
  readonly Rebuild: DateTimeZonedFromString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12338)

Since v4.0.0

## TimeZone

Schema for `DateTime.TimeZone` values.

**Details**

Default JSON serializer:

- encodes `DateTime.TimeZone` as a string (IANA identifier or offset like
  `+03:00`)

**Signature**

```ts
declare const TimeZone: TimeZone
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12208)

Since v3.10.0

## TimeZone (interface)

Type-level representation of `TimeZone`.

**Signature**

```ts
export interface TimeZone extends declare<DateTime.TimeZone> {
  readonly Rebuild: TimeZone
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12187)

Since v3.10.0

## TimeZoneFromString

Schema that parses a time zone string into a `DateTime.TimeZone`.

**Details**

Decoding:

- A `string` (IANA identifier or offset like `+03:00`) is decoded as a `DateTime.TimeZone`.

Encoding:

- A `DateTime.TimeZone` is encoded as a `string`.

**Signature**

```ts
declare const TimeZoneFromString: TimeZoneFromString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12263)

Since v4.0.0

## TimeZoneFromString (interface)

Type-level representation of `TimeZoneFromString`.

**Signature**

```ts
export interface TimeZoneFromString extends decodeTo<TimeZone, String> {
  readonly Rebuild: TimeZoneFromString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12245)

Since v4.0.0

## TimeZoneNamed

Schema for `DateTime.TimeZone.Named` values.

**Details**

Default JSON serializer:

- encodes `DateTime.TimeZone.Named` as a string (IANA time zone identifier)

**Signature**

```ts
declare const TimeZoneNamed: TimeZoneNamed
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12125)

Since v3.10.0

## TimeZoneNamed (interface)

Type-level representation of `TimeZoneNamed`.

**Signature**

```ts
export interface TimeZoneNamed extends declare<DateTime.TimeZone.Named> {
  readonly Rebuild: TimeZoneNamed
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12107)

Since v3.10.0

## TimeZoneNamedFromString

Schema that parses an IANA time zone identifier string into a `DateTime.TimeZone.Named`.

**Details**

Decoding:

- A `string` is decoded as a `DateTime.TimeZone.Named`.

Encoding:

- A `DateTime.TimeZone.Named` is encoded as a `string`.

**Signature**

```ts
declare const TimeZoneNamedFromString: TimeZoneNamedFromString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12177)

Since v4.0.0

## TimeZoneNamedFromString (interface)

Type-level representation of `TimeZoneNamedFromString`.

**Signature**

```ts
export interface TimeZoneNamedFromString extends decodeTo<TimeZoneNamed, String> {
  readonly Rebuild: TimeZoneNamedFromString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12159)

Since v4.0.0

## TimeZoneOffset

Schema for `DateTime.TimeZone.Offset` values.

**Details**

Default JSON serializer:

- encodes `DateTime.TimeZone.Offset` as a number (offset in milliseconds)

**Signature**

```ts
declare const TimeZoneOffset: TimeZoneOffset
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12077)

Since v3.10.0

## TimeZoneOffset (interface)

Type-level representation of `TimeZoneOffset`.

**Signature**

```ts
export interface TimeZoneOffset extends declare<DateTime.TimeZone.Offset> {
  readonly Rebuild: TimeZoneOffset
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12061)

Since v3.10.0

# Defect

## Defect (interface)

Type-level representation of `Defect`.

**Signature**

```ts
export interface Defect extends decodeTo<Unknown, typeof Json> {
  readonly Rebuild: Defect
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9422)

Since v3.10.0

# Duration

## Duration

Schema for `Duration` values.

**Details**

The default JSON serializer encodes `Duration` as a tagged object with the
duration type and value.

**Example** (Defining a Duration schema)

```ts
import { Duration, Schema } from "effect"

Schema.decodeUnknownSync(Schema.Duration)(Duration.seconds(5))
// => Duration(5s)
```

**Signature**

```ts
declare const Duration: Duration
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10523)

Since v3.10.0

## Duration (interface)

Type-level representation of `Duration`.

**Signature**

```ts
export interface Duration extends declare<Duration_.Duration> {
  readonly Rebuild: Duration
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10498)

Since v3.10.0

## DurationFromMillis

Schema that decodes a non-negative (possibly infinite)
integer into a `Duration`, treating the integer value as the duration in
milliseconds.

**Details**

Decoding:

- A non-negative (possibly infinite) integer representing milliseconds is
  decoded as a `Duration`

Encoding:

- A `Duration` is encoded to a non-negative (possibly infinite) integer
  representing milliseconds

**Signature**

```ts
declare const DurationFromMillis: DurationFromMillis
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10674)

Since v3.10.0

## DurationFromMillis (interface)

Type-level representation of `DurationFromMillis`.

**Signature**

```ts
export interface DurationFromMillis extends decodeTo<Duration, Number> {
  readonly Rebuild: DurationFromMillis
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10652)

Since v3.10.0

## DurationFromNanos

Schema that decodes a non-negative `bigint` into a
`Duration`, treating the bigint as nanoseconds.

**Details**

Decoding:
A non-negative `bigint` representing nanoseconds is decoded as a `Duration`.

Encoding:
Finite durations are encoded as a non-negative `bigint` number of nanoseconds.
Encoding fails when the duration cannot be represented as nanoseconds, such as
`Duration.infinity`.

**Signature**

```ts
declare const DurationFromNanos: DurationFromNanos
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10642)

Since v3.10.0

## DurationFromNanos (interface)

Type-level representation of `DurationFromNanos`.

**Signature**

```ts
export interface DurationFromNanos extends decodeTo<Duration, BigInt> {
  readonly Rebuild: DurationFromNanos
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10619)

Since v3.10.0

## DurationFromString

Schema that parses a string into a `Duration`.

**Details**

Decoding:

- A `string` is decoded as a `Duration`, accepting any format that
  `Duration.fromInput` can parse.

Encoding:

- A `Duration` is encoded as a parseable `string`.

**Signature**

```ts
declare const DurationFromString: DurationFromString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10609)

Since v4.0.0

## DurationFromString (interface)

Type-level representation of `DurationFromString`.

**Signature**

```ts
export interface DurationFromString extends decodeTo<Duration, String> {
  readonly Rebuild: DurationFromString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10590)

Since v4.0.0

# Error

## Error (interface)

Type-level representation of `Error`.

**Signature**

```ts
export interface Error extends instanceOf<globalThis.Error> {
  readonly Rebuild: Error
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9330)

Since v4.0.0

# Exit

## Exit

Creates a schema for `Exit` values using schemas for the success value, typed
failure, and unexpected defect channels.

**When to use**

Use when serializing or validating an effect outcome where success, typed
failure, and defects each need their own schema.

**Signature**

```ts
declare const Exit: <A extends Constraint, E extends Constraint, D extends Constraint>(
  value: A,
  error: E,
  defect: D
) => Exit<A, E, D>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9531)

Since v3.10.0

## Exit (interface)

Type-level representation returned by `Exit`.

**Signature**

```ts
export interface Exit<A extends Constraint, E extends Constraint, D extends Constraint> extends declareConstructor<
  Exit_.Exit<A["Type"], E["Type"]>,
  Exit_.Exit<A["Encoded"], E["Encoded"]>,
  readonly [A, E, D],
  ExitIso<A, E, D>
> {
  readonly Rebuild: Exit<A, E, D>
  readonly value: A
  readonly error: E
  readonly defect: D
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9486)

Since v3.10.0

## ExitIso (type alias)

Iso representation used for `Exit` schemas.

**Details**

Successful exits are represented as `{ _tag: "Success", value }`, while failed
exits are represented as `{ _tag: "Failure", cause }`.

**Signature**

```ts
type ExitIso<A, E, D> =
  | {
      readonly _tag: "Success"
      readonly value: A["Iso"]
    }
  | {
      readonly _tag: "Failure"
      readonly cause: CauseIso<E, D>
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9511)

Since v4.0.0

# FormData

## FormData

Schema for JavaScript `FormData` objects.

**Details**

The default JSON serializer encodes a `FormData` as an array of `[key, entry]`
pairs where each entry is tagged as `"String"` or `"File"`.

**Signature**

```ts
declare const FormData: FormData
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11080)

Since v4.0.0

## FormData (interface)

Type-level representation of `FormData`.

**Signature**

```ts
export interface FormData extends instanceOf<globalThis.FormData> {
  readonly Rebuild: FormData
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11065)

Since v4.0.0

## fromFormData (interface)

Type-level representation returned by `fromFormData`.

**Signature**

```ts
export interface fromFormData<S extends Constraint> extends decodeTo<S, FormData> {
  readonly Rebuild: fromFormData<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11129)

Since v4.0.0

# Formatter

## overrideToFormatter

Attaches a custom formatter used by `toFormatter`.

**Details**

Use this when the formatter derived from the schema structure is not suitable.
The annotation is applied through this helper because adding it directly to
`Annotations.Bottom` would make schemas invariant.

**Signature**

```ts
declare const overrideToFormatter: <S extends Top>(toFormatter: () => Formatter<S["Type"]>) => (self: S) => S["Rebuild"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12993)

Since v4.0.0

## toFormatter

Derives a string formatter function from a schema. The formatter converts
a value to its human-readable string representation, recursing into structs,
arrays, and unions.

**Details**

The optional `onBefore` hook lets you intercept specific AST nodes before
the default formatting logic runs.

**Signature**

```ts
declare const toFormatter: <S extends Constraint>(
  schema: S,
  options?: {
    readonly onBefore?:
      | ((ast: SchemaAST.AST, recur: (ast: SchemaAST.AST) => Formatter<any>) => Formatter<any> | undefined)
      | undefined
  }
) => Formatter<S["Type"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13012)

Since v4.0.0

# HashMap

## HashMap

Schema for hash maps whose keys and values conform to the provided schemas.

**Signature**

```ts
declare const HashMap: <Key extends Constraint, Value extends Constraint>(key: Key, value: Value) => HashMap<Key, Value>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9857)

Since v3.10.0

## HashMap (interface)

Type-level representation returned by `HashMap`.

**Signature**

```ts
export interface HashMap<Key extends Constraint, Value extends Constraint> extends declareConstructor<
  HashMap_.HashMap<Key["Type"], Value["Type"]>,
  HashMap_.HashMap<Key["Encoded"], Value["Encoded"]>,
  readonly [Key, Value],
  HashMapIso<Key, Value>
> {
  readonly Rebuild: HashMap<Key, Value>
  readonly key: Key
  readonly value: Value
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9827)

Since v3.10.0

## HashMapIso (type alias)

Iso representation used for `HashMap` schemas: an array of readonly
`[key, value]` tuples using each entry schema's `Iso` type.

**Signature**

```ts
type HashMapIso<Key, Value> = ReadonlyArray<readonly [Key["Iso"], Value["Iso"]]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9847)

Since v4.0.0

# HashSet

## HashSet

Schema for hash sets whose values conform to the provided element schema.

**Signature**

```ts
declare const HashSet: <Value extends Constraint>(value: Value) => HashSet<Value>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10035)

Since v3.10.0

## HashSet (interface)

Type-level representation returned by `HashSet`.

**Signature**

```ts
export interface HashSet<Value extends Constraint> extends declareConstructor<
  HashSet_.HashSet<Value["Type"]>,
  HashSet_.HashSet<Value["Encoded"]>,
  readonly [Value],
  HashSetIso<Value>
> {
  readonly Rebuild: HashSet<Value>
  readonly value: Value
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10008)

Since v3.10.0

## HashSetIso (type alias)

Iso representation used for `HashSet` schemas: an array of element values
using the element schema's `Iso` type.

**Signature**

```ts
type HashSetIso<Value> = ReadonlyArray<Value["Iso"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10027)

Since v4.0.0

# Integer checks

## isInt

Validates that a number is a safe integer (within the safe integer range
that can be exactly represented in JavaScript).

**Details**

JSON Schema:

This check corresponds to the `type: "integer"` constraint in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies an `integer: true`
constraint to ensure generated numbers are integers.

**Signature**

```ts
declare const isInt: (annotations?: Annotations.Filter) => SchemaAST.Filter<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7454)

Since v4.0.0

## isInt32

Validates that a number is a 32-bit signed integer (range: -2,147,483,648 to
2,147,483,647).

**Details**

JSON Schema:

This check corresponds to the `format: "int32"` constraint in OpenAPI 3.1,
or `minimum`/`maximum` constraints in other JSON Schema targets.

Arbitrary:

When generating test data with fast-check, this applies integer and range
constraints to ensure generated numbers are 32-bit signed integers.

**Signature**

```ts
declare const isInt32: (annotations?: Annotations.Filter) => SchemaAST.FilterGroup<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7491)

Since v4.0.0

## isUint32

Validates that a number is a 32-bit unsigned integer (range: 0 to
4,294,967,295).

**Details**

JSON Schema:

This check corresponds to the `format: "uint32"` constraint in OpenAPI 3.1,
or `minimum`/`maximum` constraints in other JSON Schema targets.

Arbitrary:

When generating test data with fast-check, this applies integer and range
constraints to ensure generated numbers are 32-bit unsigned integers.

**Signature**

```ts
declare const isUint32: (annotations?: Annotations.Filter) => SchemaAST.FilterGroup<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7523)

Since v4.0.0

# Length checks

## isLengthBetween

Validates that a value's length is within the specified range. Works with
strings and arrays.

**Details**

JSON Schema:

This check corresponds to `minLength`/`maxLength` constraints for strings
or `minItems`/`maxItems` constraints for arrays in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies `minLength` and
`maxLength` constraints to ensure generated strings or arrays have a length
within the specified range.

**Signature**

```ts
declare const isLengthBetween: (
  minimum: number,
  maximum: number,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<{ readonly length: number }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8030)

Since v4.0.0

## isMaxLength

Validates that a value has at most the specified length. Works with strings
and arrays.

**Details**

JSON Schema:

This check corresponds to the `maxLength` constraint for strings or the
`maxItems` constraint for arrays in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies a `maxLength`
constraint to ensure generated strings or arrays have at most the required
length.

**Signature**

```ts
declare const isMaxLength: (
  maxLength: number,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<{ readonly length: number }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7989)

Since v4.0.0

## isMinLength

Validates that a value has at least the specified length. Works with strings
and arrays.

**Details**

JSON Schema:

This check corresponds to the `minLength` constraint for strings or the
`minItems` constraint for arrays in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies a `minLength`
constraint to ensure generated strings or arrays have at least the required
length.

**Example** (Checking minimum length)

```ts
import { Schema } from "effect"

const NonEmptyStringSchema = Schema.String.check(Schema.isMinLength(1))
const NonEmptyArraySchema = Schema.Array(Schema.Number).check(Schema.isMinLength(1))
```

**Signature**

```ts
declare const isMinLength: (
  minLength: number,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<{ readonly length: number }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7925)

Since v4.0.0

## isNonEmpty

Validates that a value has at least one element. Works with strings and arrays.
This is equivalent to `isMinLength(1)`.

**Details**

JSON Schema:

This check corresponds to the `minLength: 1` constraint for strings or the
`minItems: 1` constraint for arrays in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies a `minLength: 1`
constraint to ensure generated strings or arrays are non-empty.

**Signature**

```ts
declare const isNonEmpty: (annotations?: Annotations.Filter) => SchemaAST.Filter<{ readonly length: number }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7965)

Since v4.0.0

# Number

## Finite

Schema for finite numbers, rejecting `NaN`, `Infinity`, and `-Infinity`.

**Signature**

```ts
declare const Finite: Finite
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11371)

Since v3.10.0

## Finite (interface)

Type-level representation of `Finite`.

**Signature**

```ts
export interface Finite extends Number {
  readonly Rebuild: Finite
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11361)

Since v3.10.0

## FiniteFromString

Schema that parses a string into a finite number.

**Details**

Decoding:

- A `string` is decoded as a finite number, rejecting `NaN`, `Infinity`, and
  `-Infinity` values.

Encoding:

- A finite number is encoded as a `string`.

**Signature**

```ts
declare const FiniteFromString: FiniteFromString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11447)

Since v4.0.0

## FiniteFromString (interface)

Type-level representation of `FiniteFromString`.

**Signature**

```ts
export interface FiniteFromString extends decodeTo<Finite, String> {
  readonly Rebuild: FiniteFromString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11428)

Since v4.0.0

## Int

Schema for integers, rejecting `NaN`, `Infinity`, and `-Infinity`.

**Signature**

```ts
declare const Int: Int
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11389)

Since v3.10.0

## Int (interface)

Type-level representation of `Int`.

**Signature**

```ts
export interface Int extends Number {
  readonly Rebuild: Int
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11379)

Since v3.10.0

## NumberFromString

Schema that parses a string into a `number` using JavaScript
number coercion.

**Details**

Decoding:
A `string` is decoded as a number, including possible non-finite values such as
`NaN`, `Infinity`, and `-Infinity`. Use `FiniteFromString` to reject non-finite
numbers.

Encoding:
A number is encoded as a `string`.

**Signature**

```ts
declare const NumberFromString: NumberFromString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11418)

Since v3.10.0

## NumberFromString (interface)

Type-level representation of `NumberFromString`.

**Signature**

```ts
export interface NumberFromString extends decodeTo<Finite, String> {
  readonly Rebuild: NumberFromString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11397)

Since v3.10.0

# Number checks

## isBetween

Validates that a number is within a specified range. The range boundaries can
be inclusive or exclusive based on the provided options.

**Details**

JSON Schema:

This check corresponds to `minimum`/`maximum` or `exclusiveMinimum`/`exclusiveMaximum`
constraints in JSON Schema, depending on the options provided.

Arbitrary:

When generating test data with fast-check, this applies `minimum` and
`maximum` constraints with optional `exclusiveMinimum` and
`exclusiveMaximum` flags to ensure generated numbers fall within the
specified range.

**Signature**

```ts
declare const isBetween: (
  options: {
    readonly minimum: number
    readonly maximum: number
    readonly exclusiveMinimum?: boolean | undefined
    readonly exclusiveMaximum?: boolean | undefined
  },
  annotations?: Annotations.Filter
) => SchemaAST.Filter<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7395)

Since v4.0.0

## isFinite

Validates that a number is finite (not `Infinity`, `-Infinity`, or `NaN`).

**Details**

JSON Schema:

This check does not have a direct JSON Schema equivalent, but ensures the
number is valid and finite.

Arbitrary:

When generating test data with fast-check, this applies `noNaN: true` and
`noInfinity: true` constraints to ensure generated numbers are finite.

**Signature**

```ts
declare const isFinite: (annotations?: Annotations.Filter) => SchemaAST.Filter<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7023)

Since v4.0.0

## isGreaterThan

Validates that a number is greater than the specified value (exclusive).

**Details**

JSON Schema:

This check corresponds to the `exclusiveMinimum` constraint in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies an
`exclusiveMinimum` constraint to ensure generated numbers are greater than
the specified value.

**Signature**

```ts
declare const isGreaterThan: (exclusiveMinimum: number, annotations?: Annotations.Filter) => SchemaAST.Filter<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7280)

Since v4.0.0

## isGreaterThanOrEqualTo

Validates that a number is greater than or equal to the specified value
(inclusive).

**Details**

JSON Schema:

This check corresponds to the `minimum` constraint in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies a `minimum` constraint
to ensure generated numbers are greater than or equal to the specified value.

**Signature**

```ts
declare const isGreaterThanOrEqualTo: (minimum: number, annotations?: Annotations.Filter) => SchemaAST.Filter<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7308)

Since v4.0.0

## isLessThan

Validates that a number is less than the specified value (exclusive).

**Details**

JSON Schema:

This check corresponds to the `exclusiveMaximum` constraint in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies an
`exclusiveMaximum` constraint to ensure generated numbers are less than the
specified value.

**Signature**

```ts
declare const isLessThan: (exclusiveMaximum: number, annotations?: Annotations.Filter) => SchemaAST.Filter<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7336)

Since v4.0.0

## isLessThanOrEqualTo

Validates that a number is less than or equal to the specified value
(inclusive).

**Details**

JSON Schema:

This check corresponds to the `maximum` constraint in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies a `maximum` constraint
to ensure generated numbers are less than or equal to the specified value.

**Signature**

```ts
declare const isLessThanOrEqualTo: (maximum: number, annotations?: Annotations.Filter) => SchemaAST.Filter<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7364)

Since v4.0.0

## isMultipleOf

Validates that a number is a multiple of the specified divisor.

**Details**

JSON Schema:

This check corresponds to the `multipleOf` constraint in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies constraints to ensure
generated numbers are multiples of the specified divisor.

**Signature**

```ts
declare const isMultipleOf: (divisor: number, annotations?: Annotations.Filter) => SchemaAST.Filter<number>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7424)

Since v4.0.0

# Numeric checks

## makeIsMultipleOf

Creates a divisibility check for any numeric type from a remainder function
and a zero value.

**Signature**

```ts
declare const makeIsMultipleOf: <T>(options: {
  readonly remainder: (input: T, divisor: T) => T
  readonly zero: NoInfer<T>
  readonly annotate?: ((divisor: T) => Annotations.Filter) | undefined
  readonly formatter?: Formatter<T> | undefined
}) => (divisor: T, annotations?: Annotations.Filter) => SchemaAST.Filter<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7243)

Since v4.0.0

# Object checks

## isMaxProperties

Validates that an object contains at most the specified number of properties.
This includes both string and symbol keys when counting properties.

**Details**

JSON Schema:

This check corresponds to the `maxProperties` constraint in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies a node-local
`maxLength` constraint. Object generators interpret it as the final number
of own properties.

**Signature**

```ts
declare const isMaxProperties: (maxProperties: number, annotations?: Annotations.Filter) => SchemaAST.Filter<object>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8244)

Since v4.0.0

## isMinProperties

Validates that an object contains at least the specified number of
properties. This includes both string and symbol keys when counting
properties.

**Details**

JSON Schema:

This check corresponds to the `minProperties` constraint in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies a node-local
`minLength` constraint. Object generators interpret it as the final number
of own properties.

**Signature**

```ts
declare const isMinProperties: (minProperties: number, annotations?: Annotations.Filter) => SchemaAST.Filter<object>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8204)

Since v4.0.0

## isPropertiesLengthBetween

Validates that an object contains between `minimum` and `maximum` properties (inclusive).
This includes both string and symbol keys when counting properties.

**Details**

JSON Schema:

This check corresponds to `minProperties` and `maxProperties`
constraints in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies node-local
`minLength` and `maxLength` constraints. Object generators interpret them as
the final number of own properties.

**Signature**

```ts
declare const isPropertiesLengthBetween: (
  minimum: number,
  maximum: number,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<object>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8285)

Since v4.0.0

## isPropertyNames

Validates that every own property key of an object satisfies the encoded side
of the provided key schema.

**Details**

This check uses `Reflect.ownKeys`, so symbol keys are validated in addition to
string property names.

JSON Schema:
For string property names, this corresponds to the `propertyNames` constraint
in JSON Schema.

**Signature**

```ts
declare const isPropertyNames: (keySchema: Constraint, annotations?: Annotations.Filter) => SchemaAST.Filter<object>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8327)

Since v4.0.0

# Optic

## overrideToCodecIso

Overrides a schema's derived ISO codec with an explicit target codec.

**When to use**

Use to provide a custom ISO transformation when the default derivation is not
appropriate.

**Details**

The resulting schema carries a custom `Iso` type parameter and uses the
provided `decode` and `encode` getters to transform between the schema type
and the target codec.

**Signature**

```ts
declare const overrideToCodecIso: <S extends Constraint, Iso>(
  to: Codec<Iso>,
  transformation: {
    readonly decode: SchemaGetter.Getter<S["Type"], Iso>
    readonly encode: SchemaGetter.Getter<Iso, S["Type"]>
  }
) => (schema: S) => overrideToCodecIso<S, Iso>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13918)

Since v4.0.0

## overrideToCodecIso (interface)

Type-level representation returned by `overrideToCodecIso`.

**Signature**

```ts
export interface overrideToCodecIso<S extends Constraint, Iso> extends BottomLazy<
  S["ast"],
  overrideToCodecIso<S, Iso>,
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"]
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: Iso
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13879)

Since v4.0.0

## toIso

Derives an `Iso` optic from a schema that isomorphically converts between
the schema's `Type` and its `Iso` (intermediate / serialized form).

**Signature**

```ts
declare const toIso: <S extends Constraint>(schema: S) => Optic_.Iso<S["Type"], S["Iso"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13848)

Since v4.0.0

## toIsoFocus

Returns an identity `Iso` over the schema's focus (`Iso`) side.

**Signature**

```ts
declare const toIsoFocus: <S extends Constraint>(_: S) => Optic_.Iso<S["Iso"], S["Iso"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13869)

Since v4.0.0

## toIsoSource

Returns an identity `Iso` over the schema's source (`Type`) side.

**Signature**

```ts
declare const toIsoSource: <S extends Constraint>(_: S) => Optic_.Iso<S["Type"], S["Type"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13859)

Since v4.0.0

# Option

## Option

Schema for `Option<A>` values.

**Signature**

```ts
declare const Option: <A extends Constraint>(value: A) => Option<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8486)

Since v3.10.0

## Option (interface)

Type-level representation returned by `Option`.

**Signature**

```ts
export interface Option<A extends Constraint> extends declareConstructor<
  Option_.Option<A["Type"]>,
  Option_.Option<A["Encoded"]>,
  readonly [A],
  OptionIso<A>
> {
  readonly Rebuild: Option<A>
  readonly value: A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8453)

Since v3.10.0

## OptionFromNullOr

Decodes a nullable, required value `T` to a required `Option<T>` value.

**Details**

Decoding maps `null` to `None` and all other values to `Some`. Encoding maps
`None` to `null` and maps `Some` to its value.

**Signature**

```ts
declare const OptionFromNullOr: <S extends Constraint>(schema: S) => OptionFromNullOr<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8570)

Since v3.10.0

## OptionFromNullOr (interface)

Type-level representation returned by `OptionFromNullOr`.

**Signature**

```ts
export interface OptionFromNullOr<S extends Constraint> extends decodeTo<Option<toType<S>>, NullOr<S>> {
  readonly Rebuild: OptionFromNullOr<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8555)

Since v3.10.0

## OptionFromNullishOr

Decodes a nullish value `T` to a required `Option<T>` value.

**Details**

Decoding maps `null` and `undefined` to `None` and all other values to
`Some`. Encoding maps `None` to `null` or `undefined` depending on
`options.onNoneEncoding`, which defaults to `undefined`, and maps `Some` to
its value.

**Signature**

```ts
declare const OptionFromNullishOr: <S extends Constraint>(
  schema: S,
  options?: { onNoneEncoding: null | undefined }
) => OptionFromNullishOr<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8629)

Since v3.10.0

## OptionFromNullishOr (interface)

Type-level representation returned by `OptionFromNullishOr`.

**Signature**

```ts
export interface OptionFromNullishOr<S extends Constraint> extends decodeTo<Option<toType<S>>, NullishOr<S>> {
  readonly Rebuild: OptionFromNullishOr<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8612)

Since v3.10.0

## OptionFromOptional

Decodes an optional or `undefined` value `A` to a required `Option<A>`
value.

**Details**

Decoding maps a missing key or a present `undefined` value to `None`, and
maps all other values to `Some`. Encoding maps `None` to a missing key and
maps `Some` to its value.

**Signature**

```ts
declare const OptionFromOptional: <S extends Constraint>(schema: S) => OptionFromOptional<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8692)

Since v4.0.0

## OptionFromOptional (interface)

Type-level representation returned by `OptionFromOptional`.

**Signature**

```ts
export interface OptionFromOptional<S extends Constraint> extends decodeTo<Option<toType<S>>, optional<S>> {
  readonly Rebuild: OptionFromOptional<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8675)

Since v4.0.0

## OptionFromOptionalKey

Decodes an optional value `A` to a required `Option<A>` value.

**Details**

Decoding maps a missing key to `None` and a present value to `Some`.
Encoding maps `None` to a missing key and maps `Some` to its value.

**Signature**

```ts
declare const OptionFromOptionalKey: <S extends Constraint>(schema: S) => OptionFromOptionalKey<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8662)

Since v4.0.0

## OptionFromOptionalKey (interface)

Type-level representation returned by `OptionFromOptionalKey`.

**Signature**

```ts
export interface OptionFromOptionalKey<S extends Constraint> extends decodeTo<Option<toType<S>>, optionalKey<S>> {
  readonly Rebuild: OptionFromOptionalKey<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8647)

Since v4.0.0

## OptionFromOptionalNullOr

Decodes an optional or `null` or `undefined` value `A` to a required `Option<A>`
value.

**Details**

Decoding maps a missing key, `undefined`, or `null` to `None`, and maps all
other values to `Some`. Encoding maps `Some` to its value. `None` is encoded
according to `options.onNoneEncoding`: `"omit"` encodes a missing key,
`null` encodes `null`, and `undefined` encodes `undefined`.

**Signature**

```ts
declare const OptionFromOptionalNullOr: <S extends Constraint>(
  schema: S,
  options?: { readonly onNoneEncoding: "omit" | null | undefined }
) => OptionFromOptionalNullOr<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8725)

Since v4.0.0

## OptionFromOptionalNullOr (interface)

Type-level representation returned by `OptionFromOptionalNullOr`.

**Signature**

```ts
export interface OptionFromOptionalNullOr<S extends Constraint> extends decodeTo<
  Option<toType<S>>,
  optional<NullOr<S>>
> {
  readonly Rebuild: OptionFromOptionalNullOr<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8705)

Since v4.0.0

## OptionFromUndefinedOr

Decodes a required value that may be `undefined` to a required `Option<T>`
value.

**Details**

Decoding maps `undefined` to `None` and all other values to `Some`. Encoding
maps `None` to `undefined` and maps `Some` to its value.

**Signature**

```ts
declare const OptionFromUndefinedOr: <S extends Constraint>(schema: S) => OptionFromUndefinedOr<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8599)

Since v3.10.0

## OptionFromUndefinedOr (interface)

Type-level representation returned by `OptionFromUndefinedOr`.

**Signature**

```ts
export interface OptionFromUndefinedOr<S extends Constraint> extends decodeTo<Option<toType<S>>, UndefinedOr<S>> {
  readonly Rebuild: OptionFromUndefinedOr<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8583)

Since v3.10.0

## OptionIso (type alias)

Iso representation used for `Option` schemas.

**Details**

`None` is represented as `{ _tag: "None" }`, while `Some` is represented as
`{ _tag: "Some", value }` using the wrapped schema's `Iso` type.

**Signature**

```ts
type OptionIso<A> = { readonly _tag: "None" } | { readonly _tag: "Some"; readonly value: A["Iso"] }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8476)

Since v4.0.0

# Order checks

## makeIsBetween

Creates an inclusive or exclusive range check for any ordered type from an
`Order.Order` instance.

**Signature**

```ts
declare const makeIsBetween: <T>(deriveOptions: {
  readonly order: Order.Order<T>
  readonly annotate?:
    | ((options: {
        readonly minimum: T
        readonly maximum: T
        readonly exclusiveMinimum?: boolean | undefined
        readonly exclusiveMaximum?: boolean | undefined
      }) => Annotations.Filter)
    | undefined
  readonly formatter?: Formatter<T> | undefined
}) => (
  options: {
    readonly minimum: T
    readonly maximum: T
    readonly exclusiveMinimum?: boolean | undefined
    readonly exclusiveMaximum?: boolean | undefined
  },
  annotations?: Annotations.Filter
) => SchemaAST.Filter<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7187)

Since v4.0.0

## makeIsGreaterThan

Creates a greater-than (`>`) check for any ordered type from an
`Order.Order` instance.

**Signature**

```ts
declare const makeIsGreaterThan: <T>(options: {
  readonly order: Order.Order<T>
  readonly annotate?: ((exclusiveMinimum: T) => Annotations.Filter) | undefined
  readonly formatter?: Formatter<T> | undefined
}) => (exclusiveMinimum: T, annotations?: Annotations.Filter) => SchemaAST.Filter<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7049)

Since v4.0.0

## makeIsGreaterThanOrEqualTo

Creates a greater-than-or-equal-to (`>=`) check for any ordered type from an
`Order.Order` instance.

**Signature**

```ts
declare const makeIsGreaterThanOrEqualTo: <T>(options: {
  readonly order: Order.Order<T>
  readonly annotate?: ((exclusiveMinimum: T) => Annotations.Filter) | undefined
  readonly formatter?: Formatter<T> | undefined
}) => (minimum: T, annotations?: Annotations.Filter) => SchemaAST.Filter<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7084)

Since v4.0.0

## makeIsLessThan

Creates a less-than (`<`) check for any ordered type from an `Order.Order`
instance.

**Signature**

```ts
declare const makeIsLessThan: <T>(options: {
  readonly order: Order.Order<T>
  readonly annotate?: ((exclusiveMaximum: T) => Annotations.Filter) | undefined
  readonly formatter?: Formatter<T> | undefined
}) => (exclusiveMaximum: T, annotations?: Annotations.Filter) => SchemaAST.Filter<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7118)

Since v4.0.0

## makeIsLessThanOrEqualTo

Creates a less-than-or-equal-to (`<=`) check for any ordered type from an
`Order.Order` instance.

**Signature**

```ts
declare const makeIsLessThanOrEqualTo: <T>(options: {
  readonly order: Order.Order<T>
  readonly annotate?: ((exclusiveMaximum: T) => Annotations.Filter) | undefined
  readonly formatter?: Formatter<T> | undefined
}) => (maximum: T, annotations?: Annotations.Filter) => SchemaAST.Filter<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L7153)

Since v4.0.0

# PropertyKey

## PropertyKey

Schema for property keys accepted by Effect schemas: finite `number`,
`symbol`, or `string`.

**Signature**

```ts
declare const PropertyKey: Union<readonly [Finite, Symbol, String]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11685)

Since v4.0.0

# ReadonlyMap

## $ReadonlyMap (interface)

Type-level representation returned by `ReadonlyMap`.

**Signature**

```ts
export interface $ReadonlyMap<Key extends Constraint, Value extends Constraint> extends declareConstructor<
  globalThis.ReadonlyMap<Key["Type"], Value["Type"]>,
  globalThis.ReadonlyMap<Key["Encoded"], Value["Encoded"]>,
  readonly [Key, Value],
  ReadonlyMapIso<Key, Value>
> {
  readonly Rebuild: $ReadonlyMap<Key, Value>
  readonly key: Key
  readonly value: Value
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9642)

Since v4.0.0

## ReadonlyMap

Schema for readonly maps whose keys and values conform to the provided
schemas.

**Signature**

```ts
declare const ReadonlyMap: <Key extends Constraint, Value extends Constraint>(
  key: Key,
  value: Value
) => $ReadonlyMap<Key, Value>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9763)

Since v3.10.0

## ReadonlyMapIso (type alias)

Iso representation used for `ReadonlyMap` schemas: an array of readonly
`[key, value]` tuples using each entry schema's `Iso` type.

**Signature**

```ts
type ReadonlyMapIso<Key, Value> = ReadonlyArray<readonly [Key["Iso"], Value["Iso"]]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9662)

Since v4.0.0

# ReadonlySet

## $ReadonlySet (interface)

Type-level representation returned by `ReadonlySet`.

**Signature**

```ts
export interface $ReadonlySet<Value extends Constraint> extends declareConstructor<
  globalThis.ReadonlySet<Value["Type"]>,
  globalThis.ReadonlySet<Value["Encoded"]>,
  readonly [Value],
  ReadonlySetIso<Value>
> {
  readonly Rebuild: $ReadonlySet<Value>
  readonly value: Value
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9919)

Since v4.0.0

## ReadonlySet

Schema for readonly sets whose values conform to the provided element schema.

**Signature**

```ts
declare const ReadonlySet: <Value extends Constraint>(value: Value) => $ReadonlySet<Value>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9946)

Since v3.10.0

## ReadonlySetIso (type alias)

Iso representation used for `ReadonlySet` schemas: an array of element values
using the element schema's `Iso` type.

**Signature**

```ts
type ReadonlySetIso<Value> = ReadonlyArray<Value["Iso"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9938)

Since v4.0.0

# Redacted

## Redacted

Schema for values that hide sensitive information from error output and
inspection.

**Details**

If the wrapped schema fails, the issue will be redacted to prevent both
the actual value and the schema details from being exposed.

Options:

- `label`: When provided, the schema will behave as follows:
  - Values will be validated against the label in addition to the wrapped schema
  - The default JSON serializer will deserialize into a `Redacted` instance with the label
  - The arbitrary generator will produce a `Redacted` instance with the label
  - The formatter will return the label
- `disallowJsonEncode`: When set to `true`, when attempting to encode a `Redacted` instance
  into JSON, it will fail with an error. This is useful when the wrapped schema is
  sensitive and should not be exposed in JSON.

**See**

- `RedactedFromValue` for decoding raw values and wrapping them in `Redacted`.

**Signature**

```ts
declare const Redacted: <S extends Constraint>(
  value: S,
  options?: { readonly label?: string | undefined; readonly disallowJsonEncode?: boolean | undefined }
) => Redacted<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8904)

Since v3.10.0

## Redacted (interface)

Type-level representation returned by `Redacted`.

**Signature**

```ts
export interface Redacted<S extends Constraint> extends declareConstructor<
  Redacted_.Redacted<S["Type"]>,
  Redacted_.Redacted<S["Encoded"]>,
  readonly [S]
> {
  readonly Rebuild: Redacted<S>
  readonly value: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8869)

Since v3.10.0

## RedactedFromValue

Decodes a value and wraps it in `Redacted<A>`. Unlike `Redacted` which
expects the input to already be a `Redacted` instance, this schema decodes
the raw value and wraps it.

**See**

- `Redacted` for schemas whose input is already a `Redacted` value.

**Signature**

```ts
declare const RedactedFromValue: <S extends Constraint>(
  value: S,
  options?: { readonly label?: string | undefined; readonly disallowEncode?: boolean | undefined }
) => RedactedFromValue<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9007)

Since v4.0.0

## RedactedFromValue (interface)

Type-level representation returned by `RedactedFromValue`.

**Signature**

```ts
export interface RedactedFromValue<S extends Constraint> extends decodeTo<
  Redacted<toType<S>>,
  middlewareDecoding<S, S["DecodingServices"]>
> {
  readonly Rebuild: RedactedFromValue<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8981)

Since v4.0.0

## redact

Middleware that wraps decoded errors in `Redacted`, preventing sensitive
schema details from leaking in error messages.

**Signature**

```ts
declare const redact: <S extends Constraint>(schema: S) => middlewareDecoding<S, S["DecodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8994)

Since v4.0.0

# RegExp

## RegExp

Schema for JavaScript `RegExp` objects.

**Details**

The default JSON serializer encodes a `RegExp` as `{ source, flags }`.

**Signature**

```ts
declare const RegExp: RegExp
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10207)

Since v4.0.0

## RegExp (interface)

Type-level representation of `RegExp`.

**Signature**

```ts
export interface RegExp extends instanceOf<globalThis.RegExp> {
  readonly Rebuild: RegExp
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10193)

Since v4.0.0

# Representation

## toRepresentation

Derives an intermediate `SchemaRepresentation.Document` from a schema. This
document is used internally by `toJsonSchemaDocument` and related
functions to produce JSON Schema output.

**Signature**

```ts
declare const toRepresentation: (schema: Constraint) => SchemaRepresentation.Document
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13203)

Since v4.0.0

# Schema Resolvers

## resolveAnnotations

Resolves the typed annotations from a schema. The term "resolve" (rather
than "get") reflects the lookup strategy: if the schema has checks, the
annotations are taken from the last check; otherwise they are taken from
the base schema instance.

**Signature**

```ts
declare const resolveAnnotations: <S extends Constraint>(
  schema: S
) => Annotations.Bottom<S["Type"], S["~type.parameters"]> | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14108)

Since v4.0.0

## resolveAnnotationsKey

Resolves the context (key-level) annotations from a schema. Context
annotations are those attached via `annotateKey` and live on the AST's
`context` rather than on the schema node itself.

**Signature**

```ts
declare const resolveAnnotationsKey: <S extends Constraint>(schema: S) => Annotations.Key<S["Type"]> | undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14122)

Since v4.0.0

# Size checks

## isMaxSize

Validates that a value has at most the specified size. Works with values
that have a `size` property, such as `Set` or `Map`.

**Details**

JSON Schema:

This check does not have a direct JSON Schema equivalent, as it applies to
values with a `size` property rather than standard JSON Schema types.

Arbitrary:

When generating test data with fast-check, this applies a node-local
`maxLength` constraint. Generators for values with a final `.size`, such as
sets and maps, interpret it as final cardinality.

**Signature**

```ts
declare const isMaxSize: (
  maxSize: number,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<{ readonly size: number }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8117)

Since v4.0.0

## isMinSize

Validates that a value has at least the specified size. Works with values
that have a `size` property, such as `Set` or `Map`.

**Details**

JSON Schema:

This check does not have a direct JSON Schema equivalent, as it applies to
values with a `size` property rather than standard JSON Schema types.

Arbitrary:

When generating test data with fast-check, this applies a node-local
`minLength` constraint. Generators for values with a final `.size`, such as
sets and maps, interpret it as final cardinality.

**Signature**

```ts
declare const isMinSize: (
  minSize: number,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<{ readonly size: number }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8076)

Since v4.0.0

## isSizeBetween

Validates that a value's size is within the specified range. Works with
values that have a `size` property, such as `Set` or `Map`.

**Details**

JSON Schema:

This check does not have a direct JSON Schema equivalent, as it applies to
values with a `size` property rather than standard JSON Schema types.

Arbitrary:

When generating test data with fast-check, this applies node-local
`minLength` and `maxLength` constraints. Generators for values with a final
`.size`, such as sets and maps, interpret them as final cardinality.

**Signature**

```ts
declare const isSizeBetween: (
  minimum: number,
  maximum: number,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<{ readonly size: number }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8158)

Since v4.0.0

# Standard Schema

## StandardSchemaV1FailureResult

Schema for a Standard Schema v1 failure result.

**Details**

The result contains an `issues` array where each issue has a message and an
optional path made of property keys or keyed path segments.

**Signature**

```ts
declare const StandardSchemaV1FailureResult: Struct<{
  readonly issues: $Array<
    Struct<{
      readonly message: String
      readonly path: optional<
        $Array<
          Union<
            readonly [
              Union<readonly [Finite, Symbol, String]>,
              Struct<{ readonly key: Union<readonly [Finite, Symbol, String]> }>
            ]
          >
        >
      >
    }>
  >
}>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11698)

Since v4.0.0

## toStandardJSONSchemaV1

Converts a schema to an experimental Standard JSON Schema V1 representation.

**Details**

https://github.com/standard-schema/standard-schema/pull/134

**Signature**

```ts
declare const toStandardJSONSchemaV1: <S extends Constraint>(
  self: S
) => StandardJSONSchemaV1<S["Encoded"], S["Type"]> & S
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1186)

Since v4.0.0

## toStandardSchemaV1

Returns a "Standard Schema" object conforming to the [Standard Schema
v1](https://standardschema.dev/) specification.

**Details**

This function creates a schema whose `validate` method attempts to decode and
validate the provided input synchronously. If the underlying `Schema`
includes any asynchronous components (e.g., asynchronous message resolutions
or checks), then validation will necessarily return a `Promise` instead.

**Example** (Creating a standard schema from a regular schema)

```ts
import { Schema } from "effect"

// Define custom hook functions for error formatting
const leafHook = (issue: any) => {
  switch (issue._tag) {
    case "InvalidType":
      return "Expected different type"
    case "InvalidValue":
      return "Invalid value provided"
    case "MissingKey":
      return "Required property missing"
    case "UnexpectedKey":
      return "Unexpected property found"
    case "Forbidden":
      return "Operation not allowed"
    case "OneOf":
      return "Multiple valid options available"
    default:
      return "Validation error"
  }
}

// Create a standard schema from a regular schema
const PersonSchema = Schema.Struct({
  name: Schema.NonEmptyString,
  age: Schema.Number.check(Schema.isBetween({ minimum: 0, maximum: 150 }))
})

const standardSchema = Schema.toStandardSchemaV1(PersonSchema, {
  leafHook
})

// The standard schema can be used with any Standard Schema v1 compatible library
const validResult = standardSchema["~standard"].validate({
  name: "Alice",
  age: 30
})
console.log(validResult) // { value: { name: "Alice", age: 30 } }

const invalidResult = standardSchema["~standard"].validate({
  name: "",
  age: 200
})
console.log(invalidResult) // { issues: [{ path: ["name"], message: "..." }, { path: ["age"], message: "..." }] }
```

**Signature**

```ts
declare const toStandardSchemaV1: <S extends ConstraintDecoder<unknown>>(
  self: S,
  options?: {
    readonly leafHook?: SchemaIssue.LeafHook | undefined
    readonly checkHook?: SchemaIssue.CheckHook | undefined
    readonly parseOptions?: SchemaAST.ParseOptions | undefined
  }
) => StandardSchemaV1<S["Encoded"], S["Type"]> & S
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1107)

Since v4.0.0

# String checks

## isBase64

Validates that a string is valid Base64 encoded data.

**Details**

JSON Schema:

This check corresponds to a `pattern` constraint in JSON Schema that matches
Base64 format.

Arbitrary:

When generating test data with fast-check, this applies a `patterns`
constraint to ensure generated strings match the Base64 pattern.

**Signature**

```ts
declare const isBase64: (annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6722)

Since v4.0.0

## isBase64Url

Validates that a string is valid Base64URL encoded data (Base64 with URL-safe
characters).

**Details**

JSON Schema:

This check corresponds to a `pattern` constraint in JSON Schema that matches
Base64URL format.

Arbitrary:

When generating test data with fast-check, this applies a `patterns`
constraint to ensure generated strings match the Base64URL pattern.

**Signature**

```ts
declare const isBase64Url: (annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6756)

Since v4.0.0

## isCapitalized

Validates that the first character of a string is unchanged by
`toUpperCase()`.

**Details**

Empty strings pass. Strings whose first character has no lowercase form, such
as a digit, punctuation mark, or whitespace, also pass.

**Signature**

```ts
declare const isCapitalized: (annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6953)

Since v4.0.0

## isEndsWith

Validates at runtime that a string ends with the specified literal suffix.

**Details**

Notes:
The JSON Schema and arbitrary metadata are built from `${endsWith}$` without
escaping regexp metacharacters. If the suffix contains regexp syntax, generated
patterns may not be equivalent to the runtime `endsWith` check.

**Signature**

```ts
declare const isEndsWith: (endsWith: string, annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6818)

Since v4.0.0

## isGUID

Validates that a string has the GUID / UUID textual shape.

**When to use**

Use when you need to accept dashed hexadecimal identifiers without enforcing
UUID version or variant bits.

**Details**

This check accepts strings in the `8-4-4-4-12` hexadecimal form. JSON Schema
output includes the corresponding `pattern` constraint and intentionally does
not include `format: "uuid"` because GUID validation is looser than UUID
validation.

Arbitrary:

When generating test data with fast-check, this applies a `patterns`
constraint to ensure generated strings match the GUID pattern.

**See**

- `isUUID` for strict UUID validation.

**Signature**

```ts
declare const isGUID: (annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6657)

Since v4.0.0

## isIncludes

Validates at runtime that a string contains the specified literal substring.

**Details**

Notes:
The JSON Schema and arbitrary metadata use the substring as a raw regexp
pattern. If the substring contains regexp syntax, generated patterns may not be
equivalent to the runtime `includes` check.

**Signature**

```ts
declare const isIncludes: (includes: string, annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6852)

Since v4.0.0

## isLowercased

Validates that a string is unchanged by JavaScript's `toLowerCase()`.

**Details**

This accepts empty strings and characters that do not have uppercase forms,
such as digits, punctuation, and whitespace. It rejects strings that would
change when lowercased.

**Signature**

```ts
declare const isLowercased: (annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6920)

Since v4.0.0

## isPattern

Validates that a string matches the specified regular expression pattern.

**Details**

JSON Schema:

This check corresponds to the `pattern` constraint in JSON Schema.

Arbitrary:

When generating test data with fast-check, this applies a `patterns`
constraint to ensure generated strings match the specified RegExp pattern.

**Signature**

```ts
declare const isPattern: (regExp: globalThis.RegExp, annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6515)

Since v4.0.0

## isStartsWith

Validates at runtime that a string starts with the specified literal prefix.

**Details**

Notes:
The JSON Schema and arbitrary metadata are built from `^${startsWith}` without
escaping regexp metacharacters. If the prefix contains regexp syntax, generated
patterns may not be equivalent to the runtime `startsWith` check.

**Signature**

```ts
declare const isStartsWith: (startsWith: string, annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6784)

Since v4.0.0

## isStringBigInt

Validates that a string is a signed base-10 integer literal for Effect's
BigInt string encoding.

**Details**

The check uses the pattern `^-?\d+$`. It does not accept leading `+`, decimal
points, exponent notation, separators, or non-decimal inputs such as
hexadecimal strings.

JSON Schema:
This check corresponds to a `pattern` constraint with the same signed
base-10 integer pattern.

**Signature**

```ts
declare const isStringBigInt: (annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6555)

Since v4.0.0

## isStringFinite

Validates that a string represents a finite number.

**Details**

JSON Schema:

This check corresponds to a `pattern` constraint in JSON Schema that matches
strings representing finite numbers.

Arbitrary:

When generating test data with fast-check, this applies a `patterns`
constraint to ensure generated strings match the number string pattern.

**Signature**

```ts
declare const isStringFinite: (annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6536)

Since v4.0.0

## isStringSymbol

Validates that a string has the `Symbol(description)` format used by Effect's
symbol string encoding.

**Details**

The check uses the pattern `^Symbol\((.*)\)$`. It is not a general test for
whether a string can be passed to JavaScript's `Symbol()` function.

**Signature**

```ts
declare const isStringSymbol: (annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6569)

Since v4.0.0

## isTrimmed

Validates that a string has no leading or trailing whitespace.

**Details**

JSON Schema:

This check corresponds to a `pattern` constraint in JSON Schema that
matches strings without leading or trailing whitespace.

Arbitrary:

When generating test data with fast-check, this applies a `patterns`
constraint to ensure generated strings match the trimmed pattern.

**Signature**

```ts
declare const isTrimmed: (annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6479)

Since v4.0.0

## isULID

Validates that a string is a valid ULID (Universally Unique Lexicographically
Sortable Identifier).

**Details**

JSON Schema:

This check corresponds to a `pattern` constraint in JSON Schema that matches
the ULID format.

Arbitrary:

When generating test data with fast-check, this applies a `patterns`
constraint to ensure generated strings match the ULID pattern.

**Signature**

```ts
declare const isULID: (annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6690)

Since v4.0.0

## isUUID

Validates that a string is a strict Universally Unique Identifier (UUID).

**When to use**

Use when you need UUID semantics, including version and RFC variant bits,
rather than only the dashed hexadecimal shape.

**Details**

Without a version argument, this accepts UUID versions 1 through 8, the nil
UUID (`00000000-0000-0000-0000-000000000000`), and the max UUID
(`ffffffff-ffff-ffff-ffff-ffffffffffff`). With a version argument, this
accepts only UUIDs with that version and RFC variant bits; nil and max UUIDs
are not versioned UUIDs and do not match version-specific checks.

JSON Schema:

This check corresponds to a `pattern` constraint in JSON Schema that matches
UUID format, and includes a `format: "uuid"` annotation.

Arbitrary:

When generating test data with fast-check, this applies a `patterns`
constraint to ensure generated strings match the UUID pattern.

**See**

- `isGUID` for shape-only GUID validation.

**Signature**

```ts
declare const isUUID: (
  version?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
  annotations?: Annotations.Filter
) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6615)

Since v4.0.0

## isUncapitalized

Validates that the first character of a string is unchanged by
`toLowerCase()`.

**Details**

Empty strings pass. Strings whose first character has no uppercase form, such
as a digit, punctuation mark, or whitespace, also pass.

**Signature**

```ts
declare const isUncapitalized: (annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6986)

Since v4.0.0

## isUppercased

Validates that a string is unchanged by JavaScript's `toUpperCase()`.

**Details**

This accepts empty strings and characters that do not have lowercase forms,
such as digits, punctuation, and whitespace. It rejects strings that would
change when uppercased.

**Signature**

```ts
declare const isUppercased: (annotations?: Annotations.Filter) => SchemaAST.Filter<string>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6887)

Since v4.0.0

# Tree

## Tree

Creates a recursive schema for a `Tree` of values described by `node`.
The resulting schema accepts a single node value, an array of trees, or an
object whose values are trees.

**Signature**

```ts
declare const Tree: <S extends Constraint>(
  node: S
) => Union<
  readonly [
    S,
    $Array<suspend<Codec<Tree<S["Type"]>, Tree<S["Encoded"]>, S["DecodingServices"], S["EncodingServices"]>>>,
    $Record<String, suspend<Codec<Tree<S["Type"]>, Tree<S["Encoded"]>, S["DecodingServices"], S["EncodingServices"]>>>
  ]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13991)

Since v4.0.0

## Tree (type alias)

Recursive tree type whose leaves are `Node` values and whose branches are
readonly arrays or string-keyed records of child trees.

**Signature**

```ts
type Tree<Node> = Node | TreeRecord<Node> | ReadonlyArray<Tree<Node>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13970)

Since v4.0.0

## TreeRecord (interface)

A record node in a `Tree`: an object mapping string keys to child
`Tree` nodes.

**Signature**

```ts
export interface TreeRecord<A> {
  readonly [x: string]: Tree<A>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13979)

Since v4.0.0

# URL

## URL

Schema for JavaScript `URL` objects.

**Details**

Default JSON serializer:

- encodes `URL` as a `string`

**Signature**

```ts
declare const URL: URL
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10287)

Since v4.0.0

## URL (interface)

Type-level representation of `URL`.

**Signature**

```ts
export interface URL extends instanceOf<globalThis.URL> {
  readonly Rebuild: URL
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10269)

Since v4.0.0

## URLFromString

Schema that decodes a `string` into a `URL`.

**Details**

Decoding:

- A **valid** URL `string` is decoded as a `URL`

Encoding:

- A `URL` is encoded as a `string`

**Signature**

```ts
declare const URLFromString: URLFromString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10332)

Since v4.0.0

## URLFromString (interface)

Type-level representation of `URLFromString`.

**Signature**

```ts
export interface URLFromString extends decodeTo<URL, String> {
  readonly Rebuild: URLFromString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10314)

Since v4.0.0

# Uint8Array

## Uint8Array

Schema for JavaScript `Uint8Array` objects.

**Details**

Default JSON serializer:

The default JSON serializer encodes Uint8Array as a Base64 encoded string.

**Signature**

```ts
declare const Uint8Array: Uint8Array
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11772)

Since v4.0.0

## Uint8Array (interface)

Type-level representation of `Uint8Array`.

**Signature**

```ts
export interface Uint8Array extends instanceOf<globalThis.Uint8Array<ArrayBufferLike>> {
  readonly Rebuild: Uint8Array
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11750)

Since v4.0.0

## Uint8ArrayFromBase64

Schema that decodes a base64 encoded string into a
`Uint8Array`.

**Details**

Decoding:

- A **valid** base64 encoded string is decoded as a `Uint8Array`.

Encoding:

- A `Uint8Array` is encoded as a base64-encoded string.

**Signature**

```ts
declare const Uint8ArrayFromBase64: Uint8ArrayFromBase64
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11814)

Since v3.10.0

## Uint8ArrayFromBase64 (interface)

Type-level representation of `Uint8ArrayFromBase64`.

**Signature**

```ts
export interface Uint8ArrayFromBase64 extends decodeTo<Uint8Array, String> {
  readonly Rebuild: Uint8ArrayFromBase64
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11795)

Since v3.10.0

## Uint8ArrayFromBase64Url

Schema that decodes a base64 (URL) encoded string into a
`Uint8Array`.

**Details**

Decoding:

- A **valid** base64 (URL) encoded string is decoded as a `Uint8Array`.

Encoding:

- A `Uint8Array` is encoded as a base64 (URL) encoded string.

**Signature**

```ts
declare const Uint8ArrayFromBase64Url: Uint8ArrayFromBase64Url
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11843)

Since v3.10.0

## Uint8ArrayFromBase64Url (interface)

Type-level representation of `Uint8ArrayFromBase64Url`.

**Signature**

```ts
export interface Uint8ArrayFromBase64Url extends decodeTo<Uint8Array, String> {
  readonly Rebuild: Uint8ArrayFromBase64Url
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11824)

Since v3.10.0

## Uint8ArrayFromHex

Schema that decodes a hex encoded string into a
`Uint8Array`.

**Details**

Decoding:

- A **valid** hex encoded string is decoded as a `Uint8Array`.

Encoding:

- A `Uint8Array` is encoded as a hex encoded string.

**Signature**

```ts
declare const Uint8ArrayFromHex: Uint8ArrayFromHex
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11877)

Since v3.10.0

## Uint8ArrayFromHex (interface)

Type-level representation of `Uint8ArrayFromHex`.

**Signature**

```ts
export interface Uint8ArrayFromHex extends decodeTo<Uint8Array, String> {
  readonly Rebuild: Uint8ArrayFromHex
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11858)

Since v3.10.0

# annotations

## annotate

Adds metadata annotations to a schema without changing its runtime behavior.
This is the pipeable (curried) counterpart of the `.annotate` method.

**Details**

Annotations provide extra context used by documentation generators, JSON
Schema converters, error formatters, and other tooling. Common keys include
`title`, `description`, `examples`, `message`, and `identifier`.

**Example** (Adding a title and description)

```ts
import { Schema } from "effect"

const Age = Schema.Number.pipe(
  Schema.annotate({
    title: "Age",
    description: "A non-negative integer representing age in years"
  })
)
```

**See**

- `annotateEncoded` to annotate the encoded side instead.

**Signature**

```ts
declare const annotate: <S extends Top>(
  annotations: Annotations.Bottom<S["Type"], S["~type.parameters"]>
) => (self: S) => S["Rebuild"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L531)

Since v4.0.0

## annotateEncoded

Adds metadata annotations to the **encoded** side of a schema without
changing its runtime behavior. This is the encoded-side counterpart of
`annotate`, which targets the decoded (Type) side.

**Details**

Internally the schema is flipped so that `Encoded` becomes `Type`,
annotated, and then flipped back.

**Example** (Adding a title to the encoded representation)

```ts
import { Schema } from "effect"

const schema = Schema.NumberFromString.pipe(
  Schema.annotateEncoded({
    title: "my title"
  })
)

console.log(Schema.toEncoded(schema).ast.annotations?.title)
// "my title"
```

**See**

- `annotate` to annotate the type side instead.

**Signature**

```ts
declare const annotateEncoded: <S extends Top>(
  annotations: Annotations.Bottom<S["Encoded"], readonly []>
) => (self: S) => S["Rebuild"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L565)

Since v4.0.0

## annotateKey

Adds key-level annotations to a schema field. This is the pipeable
(curried) counterpart of the `.annotateKey` method.

**Details**

Key annotations apply to a field's position inside a `Struct` or `Tuple`
rather than to the field's value type. They can carry a
`messageMissingKey` to customise the error shown when the field is absent,
as well as standard documentation fields such as `title`, `description`,
and `examples`.

**Example** (Customizing the missing-key message for a required field)

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  username: Schema.String.pipe(
    Schema.annotateKey({
      description: "The username used to log in",
      messageMissingKey: "Username is required"
    })
  )
})
```

**Signature**

```ts
declare const annotateKey: <S extends Top>(annotations: Annotations.Key<S["Type"]>) => (self: S) => S["Rebuild"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L599)

Since v4.0.0

# boolean

## Boolean

Schema for `boolean` values. Validates that the input is `typeof` `"boolean"`.

**When to use**

Use to validate values that are already JavaScript booleans.

**See**

- `BooleanFromBit` for a schema that decodes bit literals `0` or `1` into a boolean

**Signature**

```ts
declare const Boolean: Boolean
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3008)

Since v4.0.0

## BooleanFromBit

Schema for a boolean parsed from 0 or 1.

**When to use**

Use when decoding data sources that represent booleans as `0 | 1` while
keeping boolean values in the decoded model.

**Details**

Decoding accepts only `0 | 1`, maps `1` to `true`, and maps `0` to `false`.
Encoding maps `true` to `1` and `false` to `0`.

**See**

- `Boolean` for validating values that are already booleans
- `Literals` for keeping bit literals instead of decoding them

**Signature**

```ts
declare const BooleanFromBit: BooleanFromBit
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11734)

Since v4.0.0

## BooleanFromBit (interface)

Type-level representation of `BooleanFromBit`.

**Signature**

```ts
export interface BooleanFromBit extends decodeTo<Boolean, Literals<readonly [0, 1]>> {
  readonly Rebuild: BooleanFromBit
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11711)

Since v4.0.0

# branding

## brand

Adds a nominal brand to a schema, intersecting the output type with
`Brand.Brand<B>` to prevent accidental mixing of structurally identical types.

**When to use**

Use to make values decoded by an existing schema nominally distinct when the
schema already carries the runtime validation you need.

**Gotchas**

`brand` adds brand metadata and narrows the TypeScript output type, but it
does not add runtime checks.

**See**

- `fromBrand` for applying a Brand constructor's checks along with the brand tag

**Signature**

```ts
declare const brand: <B extends string>(
  identifier: B
) => <S extends ConstraintRebuildable>(schema: S) => brand<S["Rebuild"], B>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5065)

Since v3.10.0

## brand (interface)

Type-level representation returned by `brand`.

**Signature**

```ts
export interface brand<S extends Constraint, B> extends BottomLazy<
  S["ast"],
  brand<S, B>,
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"] & DistributeBrands<B>
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["Type"] & DistributeBrands<B>
  readonly Iso: S["Type"] & DistributeBrands<B>
  readonly schema: S
  readonly identifier: string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5023)

Since v3.10.0

## fromBrand

Creates a branded schema from a `Brand.Constructor`, applying the
constructor's checks and brand tag to the underlying schema.

**Signature**

```ts
declare const fromBrand: <A extends Brand.Brand<any>>(
  identifier: string,
  ctor: Brand.Constructor<A>
) => <S extends Top & { readonly Type: Brand.Brand.Unbranded<A> }>(self: S) => brand<S["Rebuild"], Brand.Brand.Keys<A>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5077)

Since v3.10.0

# combinators

## fieldsAssign

Adds fields to a struct schema through a struct-mapping lambda.

**When to use**

Use to add the same fields to an existing struct or every struct member of a
union.

**Details**

This is a shortcut for `MyStruct.mapFields(Struct.assign(fields))`.

**Example** (Adding fields to a union of structs)

```ts
import { Schema, Tuple } from "effect"

// Add a new field to all members of a union of structs
const schema = Schema.Union([Schema.Struct({ a: Schema.String }), Schema.Struct({ b: Schema.Number })]).mapMembers(
  Tuple.map(Schema.fieldsAssign({ c: Schema.Number }))
)
```

**Signature**

```ts
declare const fieldsAssign: <const NewFields extends Struct.Fields>(fields: NewFields) => fieldsAssign<NewFields>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3437)

Since v4.0.0

## mutableKey

Makes a struct field mutable (removes the `readonly` modifier on the property).
Use `readonlyKey` to reverse.

**Signature**

```ts
declare const mutableKey: mutableKeyLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2396)

Since v4.0.0

## optional

Marks a struct field as optional, allowing the key to be absent or
`undefined`.

**Details**

The resulting property may be absent or explicitly set to `undefined`.
Equivalent to `optionalKey(UndefinedOr(S))`.

Use `optionalKey` instead if you want exact optional semantics (absent
only, not `undefined`).

**Example** (Defining an optional field accepting undefined)

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  name: Schema.String,
  age: Schema.optional(Schema.Number)
})

// { readonly name: string; readonly age?: number | undefined }
type Person = typeof schema.Type
```

**Signature**

```ts
declare const optional: optionalLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2331)

Since v3.10.0

## optionalKey

Creates an exact optional key schema for struct fields. Unlike `optional`,
this creates exact optional properties (not `| undefined`) that can be
completely omitted from the object.

**Example** (Creating a struct with optional key)

```ts
import { Schema } from "effect"

const schema = Schema.Struct({
  name: Schema.String,
  age: Schema.optionalKey(Schema.Number)
})

// Type: { readonly name: string; readonly age?: number }
type Person = (typeof schema)["Type"]
```

**Signature**

```ts
declare const optionalKey: optionalKeyLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2264)

Since v4.0.0

## readonlyKey

Reverses `mutableKey` and returns the inner readonly schema.

**When to use**

Use to remove mutable-key wrapping from a schema field that was previously
wrapped with `mutableKey`.

**Signature**

```ts
declare const readonlyKey: readonlyKeyLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2417)

Since v4.0.0

## required

Reverses `optional` and returns the inner schema.

**When to use**

Use to remove optional wrapping from a schema field that was previously
wrapped with `optional`.

**Details**

This also unwraps the `UndefinedOr` member added by `optional`.

**Signature**

```ts
declare const required: requiredLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2354)

Since v3.10.0

## requiredKey

Reverses `optionalKey` and returns the inner required schema.

**When to use**

Use to remove optional-key wrapping from a schema field that was previously
wrapped with `optionalKey`.

**Signature**

```ts
declare const requiredKey: requiredKeyLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2285)

Since v4.0.0

## toTaggedUnion

Augments an existing `Union` of tagged structs with utility methods keyed by the discriminant field.

**Example** (Adding tagged-union utilities to an existing union)

```ts
import { Schema } from "effect"

const A = Schema.TaggedStruct("A", { value: Schema.Number })
const B = Schema.TaggedStruct("B", { name: Schema.String })

const MyUnion = Schema.Union([A, B]).pipe(Schema.toTaggedUnion("_tag"))

// Pattern-match on the union
const result = MyUnion.match(
  { _tag: "A", value: 1 },
  {
    A: (a) => `number: ${a.value}`,
    B: (b) => `name: ${b.name}`
  }
)
```

**See**

- `TaggedUnion` for a shorthand that builds the union from scratch

**Signature**

```ts
declare const toTaggedUnion: <const Tag extends PropertyKey>(
  tag: Tag
) => <const Members extends ReadonlyArray<Constraint & { readonly Type: { readonly [K in Tag]: PropertyKey } }>>(
  self: Union<Members>
) => toTaggedUnion<Tag, Members>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6088)

Since v4.0.0

## toTaggedUnion (type alias)

Type-level representation returned by `toTaggedUnion`.

**Signature**

```ts
type toTaggedUnion<Tag, Members> = Union<Members> & TaggedUnionUtils<Tag, Members>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6059)

Since v4.0.0

# constructors

## Array

Defines a `ReadonlyArray` schema for a given element schema.

**Example** (Defining an array of strings)

```ts
import { Schema } from "effect"

const schema = Schema.Array(Schema.String)

const result = Schema.decodeUnknownSync(schema)(["a", "b", "c"])
console.log(result)
// [ 'a', 'b', 'c' ]
```

**Signature**

```ts
declare const Array: ArrayLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4479)

Since v4.0.0

## ArrayEnsure

Creates a schema that accepts either a value decoded by `schema` or an array
decoded by `Schema.Array(schema)`, then returns an array.

**When to use**

Use to accept input that may be provided either as one item or as an array,
while normalizing decoded values to a readonly array.

**Details**

During encoding, one-element arrays are encoded as the single element. Empty
arrays and arrays with two or more elements are encoded as arrays.

**Gotchas**

The single-value branch is tried before the array branch. If `schema` itself
accepts arrays, an array input can be treated as one value and wrapped in a
one-element array.

**See**

- `Array` for accepting only array input
- `NonEmptyArray` for requiring at least one decoded element

**Signature**

```ts
declare const ArrayEnsure: <S extends Constraint>(schema: S) => ArrayEnsure<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4567)

Since v3.10.0

## ArrayEnsure (interface)

Type-level representation returned by `ArrayEnsure`.

**Signature**

```ts
export interface ArrayEnsure<S extends Constraint> extends decodeTo<$Array<toType<S>>, Union<readonly [S, $Array<S>]>> {
  readonly Rebuild: ArrayEnsure<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4537)

Since v3.10.0

## Class

Creates a schema-backed class whose constructor validates input against a
`Struct` schema. Construction throws a `SchemaError` on invalid
input.

**When to use**

Use when you need a schema-backed data class with validated construction,
schema-derived decoding/encoding, and class-style methods or inheritance.

**Details**

Pass the desired class type as the first type parameter. The second optional
type parameter can be used to add nominal brands.

**Gotchas**

Passing `disableChecks` in the options skips constructor validation.

**Example** (Defining a basic class)

```ts
import { Schema } from "effect"

class Person extends Schema.Class<Person>("Person")({
  name: Schema.String,
  age: Schema.Number
}) {}

const alice = new Person({ name: "Alice", age: 30 })
console.log(alice.name) // "Alice"
console.log(`${alice}`) // "Person({ name: Alice, age: 30 })"
```

**Example** (Extending a class)

```ts
import { Schema } from "effect"

class Animal extends Schema.Class<Animal>("Animal")({
  name: Schema.String
}) {}

class Dog extends Animal.extend<Dog>("Dog")({
  breed: Schema.String
}) {}

const dog = new Dog({ name: "Rex", breed: "Labrador" })
console.log(dog.name) // "Rex"
console.log(dog.breed) // "Labrador"
```

**See**

- `TaggedClass` for adding a `_tag` literal field to the class schema
- `ErrorClass` for defining schema-backed error classes
- `TaggedErrorClass` for defining tagged schema-backed error classes

**Signature**

```ts
declare const Class: <Self = never, Brand = {}>(
  identifier: string
) => {
  <const Fields extends Struct.Fields>(
    fields: Fields,
    annotations?: Annotations.Declaration<Self, readonly [Struct<Fields>]>
  ): [Self] extends [never] ? MissingSelfGeneric<"Schema.Class"> : Class<Self, Struct<Fields>, Brand>
  <S extends Struct<Struct.Fields>>(
    schema: S,
    annotations?: Annotations.Declaration<Self, readonly [S]>
  ): [Self] extends [never] ? MissingSelfGeneric<"Schema.Class"> : Class<Self, S, Brand>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12682)

Since v3.10.0

## Defect

Schema for unexpected defect values represented as `unknown` with a JSON
encoded form.

**When to use**

Use when you need a schema for `Cause` defects or other unexpected failures
whose runtime value may be any value.

**Details**

The encoded side is `Json`. During decoding, JSON objects with a string
`message` property are decoded into JavaScript `Error` values, preserving a
non-default `name` and any string `stack`. Other JSON values decode
unchanged.

During encoding, JavaScript `Error` values encode to JSON objects with
`name`, `message`, and optional `cause` properties. Pass
`{ includeStack: true }` to include string stack traces in encoded `Error`
defects, or `{ excludeCause: true }` to omit causes. Other values are
serialized through Effect's JSON formatter and then parsed back into JSON
when possible.

**Gotchas**

This schema is for carrying defects across JSON boundaries, not for
preserving every JavaScript value exactly. Some values cannot round-trip
unchanged:

- A non-`Error` object such as `{ message: "boom" }` encodes as an
  error-shaped JSON object and decodes back as an `Error`.
- JSON serialization normalizes unsupported values. For example,
  `undefined` array elements encode as `null`, unsupported object properties
  are omitted, and circular references are dropped.
- Values that cannot be represented as JSON fall back to Effect's formatted
  string representation.

**See**

- `Error` for a schema that only accepts JavaScript `Error` values.

**Signature**

```ts
declare const Defect: (options?: ErrorOptions) => Defect
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9469)

Since v4.0.0

## Enum

Creates a schema from a TypeScript enum object. Validates that the input is one of the enum's values.

**Example** (Defining a direction enum)

```ts
import { Schema } from "effect"

enum Direction {
  Up = "Up",
  Down = "Down"
}

const schema = Schema.Enum(Direction)
// accepts "Up" or "Down"
```

**Signature**

```ts
declare const Enum: <A extends { [x: string]: string | number }>(enums: A) => Enum<A>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2848)

Since v4.0.0

## Error

Schema for JavaScript `Error` objects.

**Details**

Default JSON serializer:

Encodes an `Error` as an object with `message`, optional `name`, and optional
`cause` properties, and decodes that object back into an `Error`. Stack
traces are omitted by default for security. Pass `{ includeStack: true }` to
include stack traces, or `{ excludeCause: true }` to omit causes.

**Signature**

```ts
declare const Error: (options?: ErrorOptions) => Error
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9392)

Since v4.0.0

## ErrorClass

Creates a schema-backed error class that can be used as a typed,
yieldable error in Effect programs. Combines `Class` validation with
the `YieldableError` interface so instances can be yielded directly inside
`Effect.gen`.

**Example** (Schema-backed error)

```ts
import { Effect, Schema } from "effect"

class NotFound extends Schema.ErrorClass<NotFound>("NotFound")({
  id: Schema.Number
}) {}

const program = Effect.gen(function* () {
  yield* new NotFound({ id: 1 })
})
```

**Signature**

```ts
declare const ErrorClass: <Self = never, Brand = {}>(
  identifier: string
) => {
  <const Fields extends Struct.Fields>(
    fields: Fields,
    annotations?: Annotations.Declaration<Self, readonly [Struct<Fields>]>
  ): [Self] extends [never]
    ? MissingSelfGeneric<"Schema.ErrorClass">
    : Class<Self, Struct<Fields>, Cause_.YieldableError & Brand>
  <S extends Struct<Struct.Fields>>(
    schema: S,
    annotations?: Annotations.Declaration<Self, readonly [S]>
  ): [Self] extends [never] ? MissingSelfGeneric<"Schema.ErrorClass"> : Class<Self, S, Cause_.YieldableError & Brand>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12800)

Since v4.0.0

## Literal

Creates a schema for a single literal value (string, number, bigint, boolean, or null).

**Example** (Defining a string literal)

```ts
import { Schema } from "effect"

const schema = Schema.Literal("hello")
// Type: Schema.Literal<"hello">
```

**See**

- `Literals` for a schema that represents a union of literals.
- `tag` for a schema that represents a literal value that can be
  used as a discriminator field in tagged unions and has a constructor default.

**Signature**

```ts
declare const Literal: <L extends SchemaAST.LiteralValue>(literal: L) => Literal<L>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2601)

Since v3.10.0

## Literals

Creates a union schema from an array of literal values.

**Example** (Defining status codes)

```ts
import { Schema } from "effect"

const schema = Schema.Literals(["active", "inactive", "pending"])
// accepts "active", "inactive", or "pending"
```

**See**

- `Literal` for a schema that represents a single literal.

**Signature**

```ts
declare const Literals: <const L extends ReadonlyArray<SchemaAST.LiteralValue>>(literals: L) => Literals<L>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4795)

Since v4.0.0

## NonEmptyArray

Defines a non-empty `ReadonlyArray` schema — at least one element required.
Type is `readonly [T, ...T[]]`.

**Example** (Defining a non-empty array of numbers)

```ts
import { Schema } from "effect"

const schema = Schema.NonEmptyArray(Schema.Number)

Schema.decodeUnknownSync(schema)([1, 2, 3]) // ok
Schema.decodeUnknownSync(schema)([]) // throws
```

**Signature**

```ts
declare const NonEmptyArray: NonEmptyArrayLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4527)

Since v3.10.0

## NullOr

Creates a union schema of `S | null`.

**Signature**

```ts
declare const NullOr: NullOrLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4838)

Since v3.10.0

## NullishOr

Creates a union schema of `S | null | undefined`.

**Signature**

```ts
declare const NullishOr: NullishOrLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4884)

Since v3.10.0

## Opaque

Wraps a struct schema so that its decoded `Type` becomes a nominally distinct type `Self`.
Useful for creating opaque types that are structurally identical to a base struct
but type-incompatible with it.

**Example** (Defining opaque structs)

```ts
import { Schema } from "effect"

class Person extends Schema.Opaque<Person>()(
  Schema.Struct({
    name: Schema.String
  })
) {}

// Decoded value is Person, not { name: string }
const person = Schema.decodeUnknownSync(Person)({ name: "Alice" })
// person: Person
```

**Signature**

```ts
declare const Opaque: <Self, Brand = {}>() => <S extends Top>(schema: S) => Opaque<Self, S, Brand> & Omit<S, keyof Top>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6263)

Since v4.0.0

## Record

Defines a record schema whose dynamic properties are selected by a key schema
and decoded with a value schema.

**Details**

For dynamic keys, the key schema selects matching own properties and the
value schema decodes or encodes only those selected properties. Checks on
string, number, symbol, and template literal key schemas narrow which
properties are selected.

For transformed key schemas, property selection is based on encoded property
names before the selected key is decoded.

**Example** (Defining a string-keyed record of numbers)

```ts
import { Schema } from "effect"

const schema = Schema.Record(Schema.String, Schema.Number)

// { readonly [x: string]: number }
type R = typeof schema.Type

const result = Schema.decodeUnknownSync(schema)({ a: 1, b: 2 })
console.log(result)
// { a: 1, b: 2 }
```

**Signature**

```ts
declare const Record: <Key extends Record.Key, Value extends Constraint>(
  key: Key,
  value: Value,
  options?: {
    readonly keyValueCombiner: {
      readonly decode?: Combiner.Combiner<readonly [Key["Type"], Value["Type"]]> | undefined
      readonly encode?: Combiner.Combiner<readonly [Key["Encoded"], Value["Encoded"]]> | undefined
    }
  }
) => $Record<Key, Value>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3774)

Since v3.10.0

## Struct

Defines a struct schema from a map of field schemas.

**Details**

Each field value is a schema. Use `optionalKey` or `optional` to
mark fields as optional, and `mutableKey` to mark them as mutable.

The resulting schema's `Type` is a readonly object type with the fields'
decoded types. The `Encoded` form mirrors the field schemas' encoded types.

**Example** (Defining a basic struct)

```ts
import { Schema } from "effect"

const Person = Schema.Struct({
  name: Schema.String,
  age: Schema.Number,
  email: Schema.optionalKey(Schema.String)
})

// { readonly name: string; readonly age: number; readonly email?: string }
type Person = typeof Person.Type

const alice = Schema.decodeUnknownSync(Person)({ name: "Alice", age: 30 })
console.log(alice)
// { name: 'Alice', age: 30 }
```

**Signature**

```ts
declare const Struct: <const Fields extends Struct.Fields>(fields: Fields) => Struct<Fields>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3397)

Since v3.10.0

## StructWithRest

Extends a struct schema with one or more record (index-signature) schemas,
producing a schema whose decoded type intersects the struct and all records.

**Gotchas**

TypeScript index signatures also apply to fixed keys. `StructWithRest` does
not reject incompatible fixed fields at the call site; use
`StructWithRest.ValidateRecords` when you want an explicit type-level
compatibility check.

**Example** (Defining structs with string-indexed extra keys)

```ts
import { Schema } from "effect"

const schema = Schema.StructWithRest(Schema.Struct({ id: Schema.Number }), [
  Schema.Record(Schema.String, Schema.Number)
])

// { readonly id: number, readonly [x: string]: number }
type T = typeof schema.Type
```

**Signature**

```ts
declare const StructWithRest: <const S extends StructWithRest.Objects, const Records extends StructWithRest.Records>(
  schema: S,
  records: Records
) => StructWithRest<S, Records>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4017)

Since v4.0.0

## TaggedClass

Defines a schema-backed class with an automatically populated `_tag` field.

**When to use**

Use to define class instances that are validated by a schema and participate
in tagged union matching.

**Details**

The optional `identifier` parameter overrides the schema identifier;
it defaults to the `tag` value.

**Example** (Defining a tagged class)

```ts
import { Schema } from "effect"

class Circle extends Schema.TaggedClass<Circle>()("Circle", {
  radius: Schema.Number
}) {}

const c = new Circle({ radius: 5 })
console.log(c._tag) // "Circle"
console.log(c.radius) // 5
```

**Signature**

```ts
declare const TaggedClass: <Self = never, Brand = {}>(
  identifier?: string
) => {
  <Tag extends string, const Fields extends Struct.Fields>(
    tag: Tag,
    fields: Fields,
    annotations?: Annotations.Declaration<Self, readonly [TaggedStruct<Tag, Fields>]>
  ): [Self] extends [never] ? MissingSelfGeneric<"Schema.TaggedClass"> : Class<Self, TaggedStruct<Tag, Fields>, Brand>
  <Tag extends string, S extends Struct<Struct.Fields>>(
    tag: Tag,
    schema: S,
    annotations?: Annotations.Declaration<Self, readonly [Struct<Simplify<{ readonly _tag: tag<Tag> } & S["fields"]>>]>
  ): [Self] extends [never]
    ? MissingSelfGeneric<"Schema.TaggedClass">
    : Class<Self, Struct<Simplify<{ readonly _tag: tag<Tag> } & S["fields"]>>, Brand>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12742)

Since v3.10.0

## TaggedErrorClass

Defines a schema-backed yieldable error class with an automatically populated
`_tag` field.

**When to use**

Use to define typed errors that are schema validated, yielded in `Effect.gen`,
and matched as tagged union members.

**Example** (Defining a tagged error class)

```ts
import { Effect, Schema } from "effect"

class NotFound extends Schema.TaggedErrorClass<NotFound>()("NotFound", {
  id: Schema.Number
}) {}

const program = Effect.gen(function* () {
  yield* new NotFound({ id: 42 })
})
```

**Signature**

```ts
declare const TaggedErrorClass: <Self = never, Brand = {}>(
  identifier?: string
) => {
  <Tag extends string, const Fields extends Struct.Fields>(
    tag: Tag,
    fields: Fields,
    annotations?: Annotations.Declaration<Self, readonly [TaggedStruct<Tag, Fields>]>
  ): [Self] extends [never]
    ? MissingSelfGeneric<"Schema.TaggedErrorClass">
    : Class<Self, TaggedStruct<Tag, Fields>, Cause_.YieldableError & Brand>
  <Tag extends string, S extends Struct<Struct.Fields>>(
    tag: Tag,
    schema: S,
    annotations?: Annotations.Declaration<Self, readonly [Struct<Simplify<{ readonly _tag: tag<Tag> } & S["fields"]>>]>
  ): [Self] extends [never]
    ? MissingSelfGeneric<"Schema.TaggedErrorClass">
    : Class<Self, Struct<Simplify<{ readonly _tag: tag<Tag> } & S["fields"]>>, Cause_.YieldableError & Brand>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12858)

Since v3.10.0

## TaggedStruct

Creates a struct schema with an automatically populated `_tag` field.

**When to use**

Use to define a tagged union case from a literal tag and a set of fields.

**Details**

When using the `make` method, the `_tag` field is optional and will be
added automatically. However, when decoding or encoding, the `_tag` field
must be present in the input.

**Example** (Defining a tagged struct shorthand)

```ts
import { Schema } from "effect"

// Defines a struct with a fixed `_tag` field
const tagged = Schema.TaggedStruct("A", {
  a: Schema.String
})

// This is the same as writing:
const equivalent = Schema.Struct({
  _tag: Schema.tag("A"),
  a: Schema.String
})
```

**Example** (Accessing the literal value of the tag)

```ts
import { Schema } from "effect"

const tagged = Schema.TaggedStruct("A", {
  a: Schema.String
})

// literal: "A"
const literal = tagged.fields._tag.schema.literal
```

**Signature**

```ts
declare const TaggedStruct: <const Tag extends SchemaAST.LiteralValue, const Fields extends Struct.Fields>(
  value: Tag,
  fields: Fields
) => TaggedStruct<Tag, Fields>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6009)

Since v3.10.0

## TaggedUnion

Builds a discriminated union from a record of field sets, one per variant.
Each key becomes the `_tag` literal and the value is passed to `TaggedStruct`.
The result includes `cases`, `guards`, `isAnyOf`, and `match` utilities.

**Example** (Pattern matching a discriminated union)

```ts
import { Schema } from "effect"

const Shape = Schema.TaggedUnion({
  Circle: { radius: Schema.Number },
  Rectangle: { width: Schema.Number, height: Schema.Number }
})

// Pattern-match on a decoded value
const area = Shape.match(
  { _tag: "Circle", radius: 5 },
  {
    Circle: (c) => Math.PI * c.radius ** 2,
    Rectangle: (r) => r.width * r.height
  }
)
```

**See**

- `toTaggedUnion` to augment an existing union instead

**Signature**

```ts
declare const TaggedUnion: <const CasesByTag extends Record<string, Struct.Fields>>(
  casesByTag: CasesByTag
) => TaggedUnion<{ readonly [K in keyof CasesByTag & string]: TaggedStruct<K, CasesByTag[K]> }>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6198)

Since v4.0.0

## TemplateLiteral

Creates a schema that validates strings by matching ordered template literal
parts.

**When to use**

Use when the decoded value should remain the matched string and you do not
need the individual template parts parsed into a tuple.

**Details**

Each part can be a literal `string`, `number`, or `bigint`, or a schema whose
encoded type is `string`, `number`, or `bigint`. Checks on string, number,
and bigint schema parts are applied while matching each segment.

**Example** (Defining a URL path pattern)

```ts
import { Schema } from "effect"

const schema = Schema.TemplateLiteral(["/user/", Schema.Number])
// matches strings like "/user/123", "/user/42", etc.
```

**See**

- `TemplateLiteralParser` for a schema that also parses matched parts into a tuple.

**Signature**

```ts
declare const TemplateLiteral: <const Parts extends TemplateLiteral.Parts>(parts: Parts) => TemplateLiteral<Parts>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2731)

Since v3.10.0

## TemplateLiteralParser

Schema for parsing matched template literal strings into typed tuple parts.

**When to use**

Use to validate a template literal string and decode the matched parts into
typed values.

**Details**

Unlike `TemplateLiteral`, this schema decodes the matched string into a
readonly tuple with one element per schema part. Checks on string, number,
and bigint schema parts are applied while matching each segment.

**Example** (Parsing path parameters)

```ts
import { Schema } from "effect"

const schema = Schema.TemplateLiteralParser(["/user/", Schema.NumberFromString])
// decodes "/user/42" => readonly ["/user/", 42]
```

**See**

- `TemplateLiteral` for a validation-only version that keeps the string encoded.

**Signature**

```ts
declare const TemplateLiteralParser: <const Parts extends TemplateLiteral.Parts>(
  parts: Parts
) => TemplateLiteralParser<Parts>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2810)

Since v3.10.0

## Tuple

Defines a fixed-length tuple schema from an array of element schemas.

**Example** (Defining a pair of string and number)

```ts
import { Schema } from "effect"

const schema = Schema.Tuple([Schema.String, Schema.Number])

const pair = Schema.decodeUnknownSync(schema)(["hello", 42])
console.log(pair)
// [ 'hello', 42 ]
```

**Signature**

```ts
declare const Tuple: <const Elements extends ReadonlyArray<Constraint>>(elements: Elements) => Tuple<Elements>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4236)

Since v3.10.0

## TupleWithRest

Extends a fixed-length tuple schema with a variadic rest segment.

**Details**

The resulting tuple starts with the fixed elements from `schema`. The first
schema in `rest` is the repeatable element schema, and any additional schemas
in `rest` are required trailing tuple elements after the variadic segment. For
example, `[Schema.Boolean, Schema.String]` represents zero or more booleans
followed by a final string.

**Example** (Defining tuples with rest elements)

```ts
import { Schema } from "effect"

// [string, number, ...boolean[]]
const schema = Schema.TupleWithRest(Schema.Tuple([Schema.String, Schema.Number]), [Schema.Boolean])

const result = Schema.decodeUnknownSync(schema)(["hello", 1, true, false])
console.log(result)
// [ 'hello', 1, true, false ]
```

**Signature**

```ts
declare const TupleWithRest: <S extends Tuple<Tuple.Elements>, const Rest extends TupleWithRest.Rest>(
  schema: S,
  rest: Rest
) => TupleWithRest<S, Rest>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4418)

Since v4.0.0

## UndefinedOr

Creates a union schema of `S | undefined`.

**Signature**

```ts
declare const UndefinedOr: UndefinedOrLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4861)

Since v3.10.0

## Union

Creates a union schema from an array of member schemas. Members are tested in
order; the first match is returned.

**Details**

Optionally, specify `mode`:

- `"anyOf"` (default) — matches if any member matches.
- `"oneOf"` — matches if exactly one member matches.

**Example** (Defining a string or number union)

```ts
import { Schema } from "effect"

const schema = Schema.Union([Schema.String, Schema.Number])

Schema.decodeUnknownSync(schema)("hello") // "hello"
Schema.decodeUnknownSync(schema)(42) // 42
```

**Signature**

```ts
declare const Union: <const Members extends ReadonlyArray<Constraint>>(
  members: Members,
  options?: { mode?: "anyOf" | "oneOf" }
) => Union<Members>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4749)

Since v3.10.0

## UniqueArray

Returns a new array schema that ensures all elements are unique.

**Details**

The equivalence used to determine uniqueness is the one provided by
`Schema.toEquivalence(item)`.

**Signature**

```ts
declare const UniqueArray: <S extends Constraint>(item: S) => UniqueArray<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4598)

Since v4.0.0

## UniqueSymbol

Creates a schema for a specific symbol. Only that exact symbol satisfies the schema.

**Example** (Defining a specific symbol)

```ts
import { Schema } from "effect"

const mySymbol = Symbol.for("mySymbol")
const schema = Schema.UniqueSymbol(mySymbol)
```

**See**

- `Symbol` for a schema that accepts any symbol.

**Signature**

```ts
declare const UniqueSymbol: <const sym extends symbol>(symbol: sym) => UniqueSymbol<sym>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3122)

Since v4.0.0

## asClass

Transforms a schema into a class that can be extended with `extends`. The
resulting class inherits the full schema API (e.g. `annotate`) and can define
static methods that reference `this`.

**Example** (Wrapping a primitive schema)

```ts
import { Schema } from "effect"

class MyString extends Schema.asClass(Schema.String) {
  static readonly decodeUnknownSync = Schema.decodeUnknownSync(this)
}

console.log(MyString.decodeUnknownSync("a"))
// "a"
```

**Signature**

```ts
declare const asClass: <S extends Top>(schema: S) => S & { new (_: never): {} }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2193)

Since v4.0.0

## declare

Creates a schema for a **non-parametric** opaque type using a type-guard
function. The schema accepts any unknown value and succeeds when `is` returns
`true`, failing with an `InvalidType` issue otherwise.

**When to use**

Use when you are defining a schema for an opaque type with no type parameters
and validation can be expressed as a type guard.

**Example** (Defining a schema for a custom `UserId` branded type)

```ts
import { Schema } from "effect"

type UserId = string & { readonly _tag: "UserId" }

const isUserId = (u: unknown): u is UserId => typeof u === "string" && u.startsWith("user_")

const UserId = Schema.declare<UserId>(isUserId, {
  title: "UserId",
  description: "A user identifier starting with 'user_'"
})
```

**See**

- `declareConstructor` for creating schemas for parametric types.

**Signature**

```ts
declare const declare: <T, Iso = T>(
  is: (u: unknown) => u is T,
  annotations?: Annotations.Declaration<T> | undefined
) => declare<T, Iso>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L438)

Since v3.10.0

## declare (interface)

Type-level representation returned by `declare`.

**Signature**

```ts
export interface declare<T, Iso = T> extends declareConstructor<T, T, readonly [], Iso> {
  readonly Rebuild: declare<T, Iso>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L403)

Since v3.13.3

## declareConstructor

Creates a schema for a **parametric** type (a generic container such as
`Array<A>`, `Option<A>`, etc.) by accepting a list of type-parameter schemas
and a decoder factory.

**When to use**

Use when you are defining a schema for a generic container whose validation
depends on one or more type-parameter schemas.

**Details**

The outer call `declareConstructor<T, E, Iso>()` fixes the decoded type `T`,
the encoded type `E`, and the optional iso type. The inner call receives:

- `typeParameters` — the concrete schemas for each type variable
- `run` — a factory that, given resolved codecs for each type parameter,
  returns a parsing function `(u, ast, options) => Effect<T, Issue>`
- `annotations` — optional metadata

**See**

- `declare` for creating schemas for non-parametric types.

**Example** (Schema for a parametric `Box<A>` type)

```ts
import { Effect, Option, Schema, SchemaIssue as Issue, SchemaParser } from "effect"

interface Box<A> {
  readonly value: A
}

const isBox = (u: unknown): u is Box<unknown> => typeof u === "object" && u !== null && "value" in u

const Box = <A extends Schema.Constraint>(item: A) =>
  Schema.declareConstructor<Box<A["Type"]>, Box<A["Encoded"]>>()([item], ([itemCodec]) => (u, ast, options) => {
    if (!isBox(u)) {
      return Effect.fail(new SchemaIssue.InvalidType(ast, Option.some(u)))
    }
    return Effect.map(SchemaParser.decodeUnknownEffect(itemCodec)(u.value, options), (value) => ({ value }))
  })

const schema = Box(Schema.Number)
```

**Signature**

```ts
declare const declareConstructor: <T, E = T, Iso = T>() => <const TypeParameters extends ReadonlyArray<Constraint>>(
  typeParameters: TypeParameters,
  run: (typeParameters: {
    readonly [K in keyof TypeParameters]: Codec<TypeParameters[K]["Type"], TypeParameters[K]["Encoded"]>
  }) => (
    u: unknown,
    self: SchemaAST.Declaration,
    options: SchemaAST.ParseOptions
  ) => Effect.Effect<T, SchemaIssue.Issue>,
  annotations?: Annotations.Declaration<T, TypeParameters>
) => declareConstructor<T, E, TypeParameters, Iso>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L373)

Since v4.0.0

## declareConstructor (interface)

Type-level representation returned by `declareConstructor`.

**Signature**

```ts
export interface declareConstructor<T, E, TypeParameters extends ReadonlyArray<Constraint>, Iso = T> extends Bottom<
  T,
  E,
  TypeParameters[number]["DecodingServices"],
  TypeParameters[number]["EncodingServices"],
  SchemaAST.Declaration,
  declareConstructor<T, E, TypeParameters, Iso>,
  T,
  Iso,
  TypeParameters
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L305)

Since v4.0.0

## fromJsonString

Returns a schema that decodes a JSON string and then decodes the parsed value
using the given schema.

**Details**

This is useful when working with JSON-encoded strings where the actual
structure of the value is known and described by an existing schema.

The resulting schema first parses the input string as JSON, and then runs the
provided schema on the parsed result.

JSON Schema generation:

When using `fromJsonString` with `draft-2020-12` or `openApi3.1`, the
resulting schema will be a JSON Schema with a `contentSchema` property that
contains the JSON Schema for the given schema.

**Example** (Decoding JSON strings with a schema)

```ts
import { Schema } from "effect"

const schema = Schema.Struct({ a: Schema.Number })
const schemaFromJsonString = Schema.fromJsonString(schema)

Schema.decodeUnknownSync(schemaFromJsonString)(`{"a":1,"b":2}`)
// => { a: 1 }
```

**Example** (Emitting JSON Schema for a JSON string decoder)

```ts
import { Schema } from "effect"

const original = Schema.Struct({ a: Schema.String })
const schema = Schema.fromJsonString(original)

const document = Schema.toJsonSchemaDocument(schema)

console.log(JSON.stringify(document, null, 2))
// {
//   "source": "draft-2020-12",
//   "schema": {
//     "type": "string",
//     "contentMediaType": "application/json",
//     "contentSchema": {
//       "type": "object",
//       "properties": {
//         "a": {
//           "type": "string"
//         }
//       },
//       "required": [
//         "a"
//       ],
//       "additionalProperties": false
//     }
//   },
//   "definitions": {}
// }
```

**Signature**

```ts
declare const fromJsonString: <S extends Constraint>(schema: S) => fromJsonString<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10977)

Since v4.0.0

## instanceOf

Creates a schema that validates values using `instanceof`.
Decoding and encoding pass the value through unchanged.

**Example** (Defining a schema for a built-in class)

```ts
import { Schema } from "effect"

const DateSchema = Schema.instanceOf(Date)

const decoded = Schema.decodeUnknownSync(DateSchema)(new Date("2024-01-01"))
// decoded: Date
```

**Signature**

```ts
declare const instanceOf: <C extends abstract new (...args: any) => any, Iso = InstanceType<C>>(
  constructor: C,
  annotations?: Annotations.Declaration<InstanceType<C>> | undefined
) => instanceOf<InstanceType<C>, Iso>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6299)

Since v3.10.0

## make

Creates a schema from an AST (Abstract Syntax Tree) node.

**Details**

This is the fundamental constructor for all schemas in the Effect Schema
library. It takes an AST node and wraps it in a fully-typed schema that
preserves all type information and provides the complete schema API.

The `make` function is used internally to create all primitive schemas like
`String`, `Number`, `Boolean`, etc., as well as more complex schemas. It's
the bridge between the untyped AST representation and the strongly-typed
schema.

**Signature**

```ts
declare const make: <S extends Constraint>(ast: S["ast"], options?: object) => S
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2170)

Since v3.10.0

## makeFilter

Creates a custom validation filter from a predicate function.

**Details**

The predicate receives the decoded input value, the schema AST, and parse
options, and returns a `FilterOutput`. Non-success outputs are normalized into
schema issues. The `annotations` parameter annotates the filter itself; with
the default formatter, failures use `message` first, `expected` second, and
`<filter>` when neither is provided.

When `abort` is `true`, parsing stops after this filter fails instead of
collecting later check failures.

**Example** (Reporting failure at a nested path)

```ts
import { Schema } from "effect"

const schema = Schema.Struct({ password: Schema.String, confirmPassword: Schema.String }).check(
  Schema.makeFilter((o) =>
    o.password === o.confirmPassword
      ? undefined
      : { path: ["password"], issue: "password and confirmPassword must match" }
  )
)

console.log(String(Schema.decodeUnknownExit(schema)({ password: "123456", confirmPassword: "1234567" })))
// Failure(Cause([Fail(SchemaError: password and confirmPassword must match
//   at ["password"])]))
```

**Example** (Reporting multiple failures at once)

```ts
import { Schema } from "effect"

const schema = Schema.Struct({ a: Schema.Finite, b: Schema.Finite, c: Schema.Finite }).check(
  Schema.makeFilter((o) => {
    const issues: Array<Schema.FilterIssue> = []
    if (o.a > 0) {
      if (o.b <= 0) issues.push({ path: ["b"], issue: "b must be greater than 0" })
      if (o.c <= 0) issues.push({ path: ["c"], issue: "c must be greater than 0" })
    }
    return issues
  })
)

console.log(String(Schema.decodeUnknownExit(schema)({ a: 1, b: 0, c: 0 })))
// Failure(Cause([Fail(SchemaError: b must be greater than 0
//   at ["b"]
// c must be greater than 0
//   at ["c"])]))
```

**Signature**

```ts
declare const makeFilter: <T>(
  filter: (input: T, ast: SchemaAST.AST, options: SchemaAST.ParseOptions) => FilterOutput,
  annotations?: Annotations.Filter | undefined,
  abort?: boolean
) => SchemaAST.Filter<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6387)

Since v4.0.0

## makeFilterGroup

Groups multiple checks into a single `SchemaAST.FilterGroup`, applying
optional shared annotations to the group as a whole.

**Signature**

```ts
declare const makeFilterGroup: <T>(
  checks: readonly [SchemaAST.Check<T>, ...Array<SchemaAST.Check<T>>],
  annotations?: Annotations.Filter | undefined
) => SchemaAST.FilterGroup<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6452)

Since v4.0.0

## suspend

Creates a suspended schema that defers evaluation until needed. This is
essential for creating recursive schemas where a schema references itself,
preventing infinite recursion during schema definition.

**Example** (Defining recursive tree schemas)

```ts
import { Schema } from "effect"

interface Tree {
  readonly value: number
  readonly children: ReadonlyArray<Tree>
}

const Tree = Schema.Struct({
  value: Schema.Number,
  children: Schema.Array(Schema.suspend((): Schema.Codec<Tree> => Tree))
})
```

**Signature**

```ts
declare const suspend: <S extends Constraint>(f: () => S) => suspend<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4937)

Since v3.10.0

## tag

Combines a `Literal` schema with `withConstructorDefault`, making it ideal
for discriminator fields in tagged unions. When constructing via `make`, the
`_tag` field can be omitted and will be filled automatically.

**Example** (Defining a discriminated union tag)

```ts
import { Schema } from "effect"

const A = Schema.Struct({ _tag: Schema.tag("A"), value: Schema.Number })

// _tag is optional in make, auto-filled to "A"
const a = A.make({ value: 42 })
// a: { _tag: "A", value: 42 }
```

**See**

- `tagDefaultOmit` to also omit the tag during encoding
- `TaggedStruct` for a shorthand that adds `_tag` automatically

**Signature**

```ts
declare const tag: <Tag extends SchemaAST.LiteralValue>(literal: Tag) => tag<Tag>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5913)

Since v3.10.0

## tag (interface)

Type-level representation returned by `tag`.

**Signature**

```ts
export interface tag<Tag extends SchemaAST.LiteralValue> extends withConstructorDefault<Literal<Tag>> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5889)

Since v3.10.0

## tagDefaultOmit

Creates a literal `_tag` schema that is omitted from encoded output.

**When to use**

Use to decode data that omits the discriminator field while still constructing
values with a `_tag` for tagged union matching.

**Details**

The tag is filled during decoding and construction, like `tag`, but is
omitted when encoding.

**Example** (Omitting tags during encoding)

```ts
import { Schema } from "effect"

const A = Schema.Struct({
  _tag: Schema.tagDefaultOmit("A"),
  value: Schema.Number
})

// Encode strips the _tag field
const encoded = Schema.encodeUnknownSync(A)({ _tag: "A", value: 1 })
// encoded: { value: 1 }
```

**See**

- `tag` for the variant that keeps the tag during encoding

**Signature**

```ts
declare const tagDefaultOmit: <Tag extends SchemaAST.LiteralValue>(
  literal: Tag
) => withDecodingDefaultKey<tag<Tag>, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5949)

Since v4.0.0

## withConstructorDefault

Attaches a constructor default value to a schema field.

**Details**

Constructor defaults are applied only during `make*`, not during decoding or
encoding.

**Example** (Defining an optional field with a static default)

```ts
import { Effect, Schema } from "effect"

const MySchema = Schema.Struct({
  name: Schema.String.pipe(Schema.optionalKey, Schema.withConstructorDefault(Effect.succeed("anonymous")))
})

const value = MySchema.make({})
// value: { name: "anonymous" }
```

**Signature**

```ts
declare const withConstructorDefault: <S extends Constraint & WithoutConstructorDefault>(
  defaultValue: Effect.Effect<S["~type.make.in"], SchemaError>
) => (schema: S) => withConstructorDefault<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5640)

Since v3.10.0

## withConstructorDefault (interface)

Type-level representation returned by `withConstructorDefault`.

**Signature**

```ts
export interface withConstructorDefault<S extends Constraint & WithoutConstructorDefault> extends BottomLazy<
  S["ast"],
  withConstructorDefault<S>,
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  "with-default",
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"]
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5591)

Since v3.10.0

# converting

## toDifferJsonPatch

Derives a JSON Patch differ from a codec. Serializes values to JSON (via
`toCodecJson`), computes RFC 6902 JSON Patch operations between old
and new values, and can apply patches back to the typed value.

**Signature**

```ts
declare const toDifferJsonPatch: <T, E>(schema: Codec<T, E>) => Differ<T, JsonPatch.JsonPatch>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13947)

Since v4.0.0

## toJsonSchemaDocument

Returns a JSON Schema document using draft 2020-12.

**Details**

The `options` parameter controls generation details such as additional
properties and synthesized check descriptions; it does not change the draft
target.

**Gotchas**

JSON Schema generation is best-effort. Some Effect schema semantics cannot
be represented exactly in JSON Schema, and importing an emitted JSON Schema
may produce an equivalent approximation rather than the original schema
shape.

**Signature**

```ts
declare const toJsonSchemaDocument: (
  schema: Constraint,
  options?: ToJsonSchemaOptions
) => JsonSchema.Document<"draft-2020-12">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13304)

Since v4.0.0

# decoding

## decodeEffect

Decodes a typed input (the schema's `Encoded` type) against a schema,
returning an `Effect` that succeeds with the decoded value or fails with a
`SchemaError`.

**When to use**

Use when you need to decode input already typed as the schema's `Encoded`
type in an `Effect` whose failure channel is `SchemaError`.

**Details**

For `unknown` input use `decodeUnknownEffect`.
Options may be provided either when creating the decoder or when applying it;
application options override creation options.

**See**

- `SchemaParser.decodeEffect` for the adapter that fails with `SchemaIssue.Issue` directly

**Signature**

```ts
declare const decodeEffect: <S extends Constraint>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (
  input: S["Encoded"],
  options?: SchemaAST.ParseOptions
) => Effect.Effect<S["Type"], SchemaError, S["DecodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1350)

Since v4.0.0

## decodeExit

Decodes a typed input (the schema's `Encoded` type) against a schema
synchronously, returning an `Exit` that is either a `Success` with the decoded
value or a `Failure`.

**When to use**

Use when you need to decode already typed `Encoded` input into an `Exit` and
capture schema mismatches as `SchemaError`.

**Details**

Only usable with schemas that have no `DecodingServices` requirement. For
`unknown` input use `decodeUnknownExit`.
Options may be provided either when creating the decoder or when applying it;
application options override creation options.
Schema mismatches are represented by a `Failure` cause containing
`SchemaError`.

**Gotchas**

Schema issue fail reasons are wrapped as `SchemaError`. Defects,
interruptions, and other non-schema reasons remain in the returned `Cause`,
including when they are mixed with schema issues.

**See**

- `SchemaParser.decodeExit` for the adapter whose failure contains `SchemaIssue.Issue` directly

**Signature**

```ts
declare const decodeExit: <S extends ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Encoded"], options?: SchemaAST.ParseOptions) => Exit_.Exit<S["Type"], SchemaError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1463)

Since v4.0.0

## decodeOption

Decodes a typed input (the schema's `Encoded` type) against a schema,
returning an `Option` that is `Some` with the decoded value on success or
`None` for schema mismatches.

**When to use**

Use when you already have input typed as the schema's `Encoded` type and
only need to know whether decoding succeeded.

**Details**

For `unknown` input use `decodeUnknownOption`.
Options may be provided either when creating the decoder or when applying it;
application options override creation options.

**Gotchas**

Only causes made entirely of schema issues are converted to `None`. Causes
that contain defects, interruptions, or other non-schema reasons throw
instead.

**Signature**

```ts
declare const decodeOption: <S extends ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Encoded"], options?: SchemaAST.ParseOptions) => Option_.Option<S["Type"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1524)

Since v3.10.0

## decodePromise

Decodes a typed input (the schema's `Encoded` type) against a schema,
returning a `Promise` that resolves with the decoded value or rejects with a
`SchemaError` for schema mismatches.

**When to use**

Use when you already have input typed as the schema's `Encoded` type and
need decoding to return a JavaScript `Promise` that rejects with
`SchemaError` for schema mismatches.

**Details**

For `unknown` input use `decodeUnknownPromise`.
Options may be provided either when creating the decoder or when applying it;
application options override creation options.

**Gotchas**

Non-schema failures may reject with a runtime failure instead of
`SchemaError`.

**See**

- `SchemaParser.decodePromise` for the adapter that rejects with an `Error` whose cause is `SchemaIssue.Issue`

**Signature**

```ts
declare const decodePromise: <S extends ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Encoded"], options?: SchemaAST.ParseOptions) => Promise<S["Type"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1663)

Since v3.10.0

## decodeResult

Decodes a typed input (the schema's `Encoded` type) against a schema,
returning a `Result` that succeeds with the decoded value or fails with a
`SchemaError` for schema mismatches.

**When to use**

Use when you already have input typed as the schema's `Encoded` type and want
schema mismatches returned as `Result.fail` with `SchemaError`.

**Details**

For `unknown` input use `decodeUnknownResult`.
Options may be provided either when creating the decoder or when applying it;
application options override creation options.
Schema mismatches are returned as `Result.fail` with `SchemaError`.

**Gotchas**

Only causes made entirely of schema issues are returned as `Result.fail`.
Causes that contain defects, interruptions, or other non-schema reasons throw
instead.

**See**

- `SchemaParser.decodeResult` for the adapter that fails with `SchemaIssue.Issue` directly

**Signature**

```ts
declare const decodeResult: <S extends ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Encoded"], options?: SchemaAST.ParseOptions) => Result_.Result<S["Type"], SchemaError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1593)

Since v4.0.0

## decodeSync

Decodes a typed input (the schema's `Encoded` type) against a schema
synchronously, returning the decoded value or throwing a `SchemaError`
for schema mismatches.

**When to use**

Use when you already have input typed as the schema's `Encoded` type and
want schema mismatches to throw `SchemaError` synchronously.

**Details**

For `unknown` input use `decodeUnknownSync`.
Only service-free schemas can be decoded synchronously. Options may be
provided either when creating the decoder or when applying it; application
options override creation options.

**Gotchas**

Non-schema failures may throw a runtime failure instead of `SchemaError`.

**See**

- `SchemaParser.decodeSync` for the adapter that throws an `Error` whose cause is `SchemaIssue.Issue`

**Signature**

```ts
declare const decodeSync: <S extends ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Encoded"], options?: SchemaAST.ParseOptions) => S["Type"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1745)

Since v4.0.0

## decodeUnknownEffect

Decodes an `unknown` input against a schema, returning an `Effect` that
succeeds with the decoded value or fails with a `SchemaError`.

**When to use**

Use when you need to decode unknown input in an `Effect` whose failure
channel is `SchemaError`.

**Details**

Prefer `decodeEffect` when the input is already typed as the schema's
`Encoded` type.
Options may be provided either when creating the decoder or when applying it;
application options override creation options.

**See**

- `SchemaParser.decodeUnknownEffect` for the adapter that fails with `SchemaIssue.Issue` directly

**Signature**

```ts
declare const decodeUnknownEffect: <S extends Constraint>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Effect.Effect<S["Type"], SchemaError, S["DecodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1319)

Since v4.0.0

## decodeUnknownExit

Decodes an `unknown` input against a schema synchronously, returning an
`Exit` that is either a `Success` with the decoded value or a `Failure`.

**When to use**

Use when you need to decode unknown input into an `Exit` and capture schema
mismatches as `SchemaError`.

**Details**

Only usable with schemas that have no `DecodingServices` requirement. Prefer
`decodeExit` when the input is already typed as the schema's `Encoded`
type.
Options may be provided either when creating the decoder or when applying it;
application options override creation options.
Schema mismatches are represented by a `Failure` cause containing
`SchemaError`.

**Gotchas**

Schema issue fail reasons are wrapped as `SchemaError`. Defects,
interruptions, and other non-schema reasons remain in the returned `Cause`,
including when they are mixed with schema issues.

**See**

- `SchemaParser.decodeUnknownExit` for the adapter whose failure contains `SchemaIssue.Issue` directly

**Signature**

```ts
declare const decodeUnknownExit: <S extends ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Exit_.Exit<S["Type"], SchemaError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1426)

Since v4.0.0

## decodeUnknownOption

Decodes an `unknown` input against a schema, returning an `Option` that is
`Some` with the decoded value on success or `None` for schema mismatches.

**When to use**

Use when you do not know the input type statically and only need to know
whether decoding succeeded.

**Details**

Prefer this over `decodeUnknownExit` or `decodeUnknownEffect`
when you don't need error details. For input already typed as the schema's
`Encoded` type use `decodeOption`.
Options may be provided either when creating the decoder or when applying it;
application options override creation options.

**Gotchas**

Only causes made entirely of schema issues are converted to `None`. Causes
that contain defects, interruptions, or other non-schema reasons throw
instead.

**Signature**

```ts
declare const decodeUnknownOption: <S extends ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Option_.Option<S["Type"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1494)

Since v3.10.0

## decodeUnknownPromise

Decodes an `unknown` input against a schema, returning a `Promise` that
resolves with the decoded value or rejects with a `SchemaError` for
schema mismatches.

**When to use**

Use when you need decoding of unknown input to return a JavaScript `Promise`
that rejects with `SchemaError` for schema mismatches.

**Details**

For input already typed as the schema's `Encoded` type use
`decodePromise`.
Options may be provided either when creating the decoder or when applying it;
application options override creation options.

**Gotchas**

Non-schema failures may reject with a runtime failure instead of
`SchemaError`.

**See**

- `SchemaParser.decodeUnknownPromise` for the adapter that rejects with an `Error` whose cause is `SchemaIssue.Issue`

**Signature**

```ts
declare const decodeUnknownPromise: <S extends ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Promise<S["Type"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1626)

Since v3.10.0

## decodeUnknownResult

Decodes an `unknown` input against a schema, returning a `Result` that
succeeds with the decoded value or fails with a `SchemaError` for schema
mismatches.

**When to use**

Use when you do not know the input type statically and want schema mismatches
returned as `Result.fail` with `SchemaError`.

**Details**

For input already typed as the schema's `Encoded` type use
`decodeResult`.
Options may be provided either when creating the decoder or when applying it;
application options override creation options.
Schema mismatches are returned as `Result.fail` with `SchemaError`.

**Gotchas**

Only causes made entirely of schema issues are returned as `Result.fail`.
Causes that contain defects, interruptions, or other non-schema reasons throw
instead.

**See**

- `SchemaParser.decodeUnknownResult` for the adapter that fails with `SchemaIssue.Issue` directly

**Signature**

```ts
declare const decodeUnknownResult: <S extends ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Result_.Result<S["Type"], SchemaError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1558)

Since v4.0.0

## decodeUnknownSync

Decodes an `unknown` input against a schema synchronously, returning the
decoded value or throwing a `SchemaError` for schema mismatches.

**When to use**

Use when you need to validate unknown data at a synchronous boundary and want
schema mismatches to throw `SchemaError`.

**Details**

For input already typed as the schema's `Encoded` type use `decodeSync`.
Only service-free schemas can be decoded synchronously. For alternatives that
do not throw on schema mismatches, see `decodeUnknownOption`,
`decodeUnknownExit`, or `decodeUnknownEffect`. Options may be provided either
when creating the decoder or when applying it; application options override
creation options.

**Gotchas**

Non-schema failures may throw a runtime failure instead of `SchemaError`.

**Example** (Decoding with a transformation schema)

```ts
import { Schema } from "effect"

const NumberFromString = Schema.NumberFromString

console.log(Schema.decodeUnknownSync(NumberFromString)("42"))
// Output: 42

Schema.decodeUnknownSync(NumberFromString)("not a number")
// throws SchemaError: NumberFromString
//   └─ Encoded side transformation failure
//      └─ NumberFromString
//         └─ Expected a numeric string, actual "not a number"
```

**See**

- `SchemaParser.decodeUnknownSync` for the adapter that throws an `Error` whose cause is `SchemaIssue.Issue`

**Signature**

```ts
declare const decodeUnknownSync: <S extends ConstraintDecoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => S["Type"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1712)

Since v4.0.0

## fromFormData

Schema for decoding `FormData` through a bracket-notation tree.

**When to use**

Use to decode browser or multipart form data into a structured schema value.

**Details**

The decoding process has two steps:

1. Parse `FormData` into a nested tree record.
2. Decode the parsed value with the given schema.

You can express nested values using bracket notation.

If you want to decode string fields into non-string primitive values, use
`Schema.toCodecStringTree`.

**Example** (Decoding a flat structure)

```ts
import { Schema } from "effect"

const schema = Schema.fromFormData(
  Schema.Struct({
    a: Schema.String
  })
)

const formData = new FormData()
formData.append("a", "1")
formData.append("b", "2")

console.log(String(Schema.decodeUnknownExit(schema)(formData)))
// Success({"a":"1"})
```

**Example** (Decoding nested fields)

```ts
import { Schema } from "effect"

const schema = Schema.fromFormData(
  Schema.Struct({
    a: Schema.String,
    b: Schema.Struct({
      c: Schema.String,
      d: Schema.String
    })
  })
)

const formData = new FormData()
formData.append("a", "1")
formData.append("b[c]", "2")
formData.append("b[d]", "3")

console.log(String(Schema.decodeUnknownExit(schema)(formData)))
// Success({"a":"1","b":{"c":"2","d":"3"}})
```

**Example** (Parsing non-string values)

```ts
import { Schema } from "effect"

const schema = Schema.fromFormData(
  Schema.toCodecStringTree(
    Schema.Struct({
      a: Schema.Int
    })
  )
)

const formData = new FormData()
formData.append("a", "1")

console.log(String(Schema.decodeUnknownExit(schema)(formData)))
// Success({"a":1}) // Note: the value is a number
```

**Signature**

```ts
declare const fromFormData: <S extends Constraint>(schema: S) => fromFormData<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11218)

Since v4.0.0

## fromURLSearchParams

Schema for decoding `URLSearchParams` through a bracket-notation tree.

**When to use**

Use to decode query parameters into a structured schema value.

**Details**

The decoding process has two steps:

1. Parse `URLSearchParams` into a nested tree record.
2. Decode the parsed value with the given schema.

You can express nested values using bracket notation.

If you want to decode values that are not strings, use
`Schema.toCodecStringTree`. This serializer preserves values such as
numbers when compatible with the schema.

**Example** (Decoding a flat structure)

```ts
import { Schema } from "effect"

const schema = Schema.fromURLSearchParams(
  Schema.Struct({
    a: Schema.String
  })
)

const urlSearchParams = new URLSearchParams("a=1&b=2")

console.log(String(Schema.decodeUnknownExit(schema)(urlSearchParams)))
// Success({"a":"1"})
```

**Example** (Decoding nested fields)

```ts
import { Schema } from "effect"

const schema = Schema.fromURLSearchParams(
  Schema.Struct({
    a: Schema.String,
    b: Schema.Struct({
      c: Schema.String,
      d: Schema.String
    })
  })
)

const urlSearchParams = new URLSearchParams("a=1&b[c]=2&b[d]=3")

console.log(String(Schema.decodeUnknownExit(schema)(urlSearchParams)))
// Success({"a":"1","b":{"c":"2","d":"3"}})
```

**Example** (Parsing non-string values)

```ts
import { Schema } from "effect"

const schema = Schema.fromURLSearchParams(
  Schema.toCodecStringTree(
    Schema.Struct({
      a: Schema.Int
    })
  )
)

const urlSearchParams = new URLSearchParams("a=1&b=2")

console.log(String(Schema.decodeUnknownExit(schema)(urlSearchParams)))
// Success({"a":1}) // Note: the value is a number
```

**Signature**

```ts
declare const fromURLSearchParams: <S extends Constraint>(schema: S) => fromURLSearchParams<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11351)

Since v4.0.0

## middlewareDecoding

Intercepts the decoding pipeline of a schema.

**Details**

The provided function receives the current decoding `Effect` and `ParseOptions`,
and returns a new `Effect` — potentially adding service requirements (`RD`),
recovering from errors, or augmenting the result.

**Example** (Logging decode failures)

```ts
import { Effect, Schema } from "effect"

const Logged = Schema.String.pipe(
  Schema.middlewareDecoding((effect) => Effect.tapError(effect, (issue) => Effect.log("decode failed", issue)))
)
```

**See**

- `catchDecoding` for a simpler error-recovery variant

**Signature**

```ts
declare const middlewareDecoding: <S extends Constraint, RD>(
  decode: (
    effect: Effect.Effect<Option_.Option<S["Type"]>, SchemaIssue.Issue, S["DecodingServices"]>,
    options: SchemaAST.ParseOptions
  ) => Effect.Effect<Option_.Option<S["Type"]>, SchemaIssue.Issue, RD>
) => (schema: S) => middlewareDecoding<S, RD>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5138)

Since v4.0.0

## middlewareDecoding (interface)

Type-level representation returned by `middlewareDecoding`.

**Signature**

```ts
export interface middlewareDecoding<S extends Constraint, RD> extends BottomLazy<
  S["ast"],
  middlewareDecoding<S, RD>,
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"]
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: RD
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5091)

Since v4.0.0

## withDecodingDefault

Wraps the `Encoded` side with `optional` (key absent **or** `undefined`)
and provides a default `Encoded` value when the field is missing or
`undefined` during decoding.

**When to use**

Use when the default is expressed in the encoded representation, before the
field's decoding transformation runs.

**Details**

The default value is specified in terms of the `Encoded` type (before any
decoding transformations).

Options:

- `encodingStrategy`:
  - `"passthrough"` (default): include the value in the encoded output.
  - `"omit"`: omit the key from the encoded output.

**Example** (Providing a default for an optional field value)

```ts
import { Effect, Schema } from "effect"

const MySchema = Schema.Struct({
  name: Schema.String.pipe(Schema.optional, Schema.withDecodingDefault(Effect.succeed("anonymous")))
})

const result = Schema.decodeUnknownSync(MySchema)({ name: undefined })
// result: { name: "anonymous" }
```

**See**

- `withDecodingDefaultKey` for the key-level variant (key absent only, not `undefined`)
- `withDecodingDefaultType` for the variant where the default is a `Type` value

**Signature**

```ts
declare const withDecodingDefault: <S extends Constraint, R = never>(
  defaultValue: Effect.Effect<S["Encoded"], SchemaError, R>,
  options?: DecodingDefaultOptions
) => (self: S) => withDecodingDefault<S, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5819)

Since v3.10.0

## withDecodingDefault (interface)

Type-level representation returned by `withDecodingDefault`.

**Signature**

```ts
export interface withDecodingDefault<S extends Constraint, R = never> extends decodeTo<S, optional<toEncoded<S>>, R> {
  readonly Rebuild: withDecodingDefault<S, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5776)

Since v3.10.0

## withDecodingDefaultKey

Makes a struct key optional on the `Encoded` side and provides a default
`Encoded` value when the key is missing during decoding.

**Details**

The key uses `optionalKey` on the encoded side, so it may be absent from the
input object but **not** `undefined`. The default value is specified in terms
of the `Encoded` type (before any decoding transformations).

Options:

- `encodingStrategy`:
  - `"passthrough"` (default): include the value in the encoded output.
  - `"omit"`: omit the key from the encoded output.

**Example** (Providing a default for a missing struct key)

```ts
import { Effect, Schema } from "effect"

const MySchema = Schema.Struct({
  name: Schema.String.pipe(Schema.withDecodingDefaultKey(Effect.succeed("anonymous")))
})

const result = Schema.decodeUnknownSync(MySchema)({})
// result: { name: "anonymous" }
```

**See**

- `withDecodingDefault` for the value-level variant (key absent **or** `undefined`)
- `withDecodingDefaultTypeKey` for the variant where the default is a `Type` value

**Signature**

```ts
declare const withDecodingDefaultKey: <S extends Constraint, R = never>(
  defaultValue: Effect.Effect<S["Encoded"], SchemaError, R>,
  options?: DecodingDefaultOptions
) => (self: S) => withDecodingDefaultKey<S, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5711)

Since v4.0.0

## withDecodingDefaultKey (interface)

Type-level representation returned by `withDecodingDefaultKey`.

**Signature**

```ts
export interface withDecodingDefaultKey<S extends Constraint, R = never> extends decodeTo<
  S,
  optionalKey<toEncoded<S>>,
  R
> {
  readonly Rebuild: withDecodingDefaultKey<S, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5655)

Since v4.0.0

## withDecodingDefaultType

Wraps the `Encoded` side with `optional` (key absent **or** `undefined`)
and provides a default `Type` value when the field is missing or
`undefined` during decoding.

**When to use**

Use when the default is already in the decoded representation and should not
pass through the field's decoding transformation.

**Details**

Unlike `withDecodingDefault`, the default value is specified in terms
of the `Type` (decoded) representation, so it does not need to go through
the decoding transformation.

Options:

- `encodingStrategy`:
  - `"passthrough"` (default): include the value in the encoded output.
  - `"omit"`: omit the key from the encoded output.

**See**

- `withDecodingDefault` for the variant where the default is an `Encoded` value
- `withDecodingDefaultTypeKey` for the key-level variant

**Signature**

```ts
declare const withDecodingDefaultType: <S extends Constraint, R = never>(
  defaultValue: Effect.Effect<S["Type"], SchemaError, R>,
  options?: DecodingDefaultOptions
) => (self: S) => withDecodingDefaultType<S, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5871)

Since v4.0.0

## withDecodingDefaultType (interface)

Type-level representation returned by `withDecodingDefaultType`.

**Signature**

```ts
export interface withDecodingDefaultType<S extends Constraint, R = never> extends decodeTo<
  withDecodingDefault<toType<S>, R>,
  optional<S>
> {
  readonly Rebuild: withDecodingDefaultType<S, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5838)

Since v4.0.0

## withDecodingDefaultTypeKey

Makes a struct key optional on the `Encoded` side (`optionalKey`, so the
key may be absent but **not** `undefined`) and provides a default `Type`
value when the key is missing during decoding.

**Details**

Unlike `withDecodingDefaultKey`, the default value is specified in
terms of the `Type` (decoded) representation, so it does not need to go
through the decoding transformation.

Options:

- `encodingStrategy`:
  - `"passthrough"` (default): include the value in the encoded output.
  - `"omit"`: omit the key from the encoded output.

**See**

- `withDecodingDefaultKey` for the variant where the default is an `Encoded` value
- `withDecodingDefaultType` for the value-level variant

**Signature**

```ts
declare const withDecodingDefaultTypeKey: <S extends Constraint, R = never>(
  defaultValue: Effect.Effect<S["Type"], SchemaError, R>,
  options?: DecodingDefaultOptions
) => (self: S) => withDecodingDefaultTypeKey<S, R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5758)

Since v4.0.0

## withDecodingDefaultTypeKey (interface)

Type-level representation returned by `withDecodingDefaultTypeKey`.

**Signature**

```ts
export interface withDecodingDefaultTypeKey<S extends Constraint, R = never> extends decodeTo<
  withDecodingDefaultKey<toType<S>, R>,
  optionalKey<S>
> {
  readonly Rebuild: withDecodingDefaultTypeKey<S, R>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5730)

Since v4.0.0

# encoding

## encodeEffect

Encodes a typed input (the schema's `Type`) against a schema, returning an
`Effect` that succeeds with the encoded value or fails with a
`SchemaError`.

**When to use**

Use when you need to encode input already typed as the schema's `Type` in
an `Effect` whose failure channel is `SchemaError`.

**Details**

For `unknown` input use `encodeUnknownEffect`.
Options may be provided either when creating the encoder or when applying it;
application options override creation options.

**See**

- `SchemaParser.encodeEffect` for the adapter that fails with `SchemaIssue.Issue` directly

**Signature**

```ts
declare const encodeEffect: <S extends Constraint>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (
  input: S["Type"],
  options?: SchemaAST.ParseOptions
) => Effect.Effect<S["Encoded"], SchemaError, S["EncodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1813)

Since v4.0.0

## encodeExit

Encodes a typed input (the schema's `Type`) against a schema synchronously,
returning an `Exit` that is either a `Success` with the encoded value or a
`Failure`.

**When to use**

Use when you need to encode already typed schema values into an `Exit` and
capture schema mismatches as `SchemaError`.

**Details**

Only usable with schemas that have no `EncodingServices` requirement. For
`unknown` input use `encodeUnknownExit`.
Options may be provided either when creating the encoder or when applying it;
application options override creation options.
Schema mismatches are represented by a `Failure` cause containing
`SchemaError`.

**Gotchas**

Schema issue fail reasons are wrapped as `SchemaError`. Defects,
interruptions, and other non-schema reasons remain in the returned `Cause`,
including when they are mixed with schema issues.

**See**

- `SchemaParser.encodeExit` for the adapter whose failure contains `SchemaIssue.Issue` directly

**Signature**

```ts
declare const encodeExit: <S extends ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Type"], options?: SchemaAST.ParseOptions) => Exit_.Exit<S["Encoded"], SchemaError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1887)

Since v4.0.0

## encodeOption

Encodes a typed input (the schema's `Type`) against a schema, returning an
`Option` that is `Some` with the encoded value on success or `None` for schema
mismatches.

**When to use**

Use when you already have a value typed as the schema's `Type` and only need
to know whether encoding succeeded.

**Details**

For `unknown` input use `encodeUnknownOption`.
Options may be provided either when creating the encoder or when applying it;
application options override creation options.

**Gotchas**

Only causes made entirely of schema issues are converted to `None`. Causes
that contain defects, interruptions, or other non-schema reasons throw
instead.

**Signature**

```ts
declare const encodeOption: <S extends ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Type"], options?: SchemaAST.ParseOptions) => Option_.Option<S["Encoded"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1949)

Since v3.10.0

## encodePromise

Encodes a typed input (the schema's `Type`) against a schema, returning a
`Promise` that resolves with the encoded value or rejects with a
`SchemaError` for schema mismatches.

**When to use**

Use when you already have a value typed as the schema's `Type` and need
encoding to return a JavaScript `Promise` that rejects with `SchemaError` for
schema mismatches.

**Details**

For `unknown` input use `encodeUnknownPromise`.
Options may be provided either when creating the encoder or when applying it;
application options override creation options.

**Gotchas**

Non-schema failures may reject with a runtime failure instead of
`SchemaError`.

**See**

- `SchemaParser.encodePromise` for the adapter that rejects with an `Error` whose cause is `SchemaIssue.Issue`

**Signature**

```ts
declare const encodePromise: <S extends ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Type"], options?: SchemaAST.ParseOptions) => Promise<S["Encoded"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2086)

Since v3.10.0

## encodeResult

Encodes a typed input (the schema's `Type`) against a schema, returning a
`Result` that succeeds with the encoded value or fails with a
`SchemaError` for schema mismatches.

**When to use**

Use when you already have a value typed as the schema's `Type` and want schema
mismatches returned as `Result.fail` with `SchemaError`.

**Details**

For `unknown` input use `encodeUnknownResult`.
Options may be provided either when creating the encoder or when applying it;
application options override creation options.
Schema mismatches are returned as `Result.fail` with `SchemaError`.

**Gotchas**

Only causes made entirely of schema issues are returned as `Result.fail`.
Causes that contain defects, interruptions, or other non-schema reasons throw
instead.

**See**

- `SchemaParser.encodeResult` for the adapter that fails with `SchemaIssue.Issue` directly

**Signature**

```ts
declare const encodeResult: <S extends ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Type"], options?: SchemaAST.ParseOptions) => Result_.Result<S["Encoded"], SchemaError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2017)

Since v4.0.0

## encodeSync

Encodes a typed input (the schema's `Type`) against a schema synchronously,
throwing a `SchemaError` for schema mismatches.

**When to use**

Use when you already have a value typed as the schema's `Type` and want
schema mismatches to throw `SchemaError` synchronously.

**Details**

For `unknown` input use `encodeUnknownSync`.
Options may be provided either when creating the encoder or when applying it;
application options override creation options.

**Gotchas**

Non-schema failures may throw a runtime failure instead of `SchemaError`.

**See**

- `SchemaParser.encodeSync` for the adapter that throws an `Error` whose cause is `SchemaIssue.Issue`

**Signature**

```ts
declare const encodeSync: <S extends ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: S["Type"], options?: SchemaAST.ParseOptions) => S["Encoded"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2148)

Since v4.0.0

## encodeUnknownEffect

Encodes an `unknown` input against a schema, returning an `Effect` that
succeeds with the encoded value or fails with a `SchemaError`.

**When to use**

Use when you need to encode unknown input in an `Effect` whose failure
channel is `SchemaError`.

**Details**

Prefer `encodeEffect` when the value is already typed as the schema's
`Type`.
Options may be provided either when creating the encoder or when applying it;
application options override creation options.

**Example** (Encoding a value to a string)

```ts
import { Effect, Schema } from "effect"

const NumberFromString = Schema.NumberFromString

Effect.runPromise(Schema.encodeUnknownEffect(NumberFromString)(42)).then(console.log)
// Output: "42"
```

**See**

- `SchemaParser.encodeUnknownEffect` for the adapter that fails with `SchemaIssue.Issue` directly

**Signature**

```ts
declare const encodeUnknownEffect: <S extends Constraint>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (
  input: unknown,
  options?: SchemaAST.ParseOptions
) => Effect.Effect<S["Encoded"], SchemaError, S["EncodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1782)

Since v4.0.0

## encodeUnknownExit

Encodes an `unknown` input against a schema synchronously, returning an
`Exit` that is either a `Success` with the encoded value or a `Failure`.

**When to use**

Use when you need to encode unknown input into an `Exit` and capture schema
mismatches as `SchemaError`.

**Details**

Only usable with schemas that have no `EncodingServices` requirement. Prefer
`encodeExit` when the value is already typed as the schema's `Type`.
Options may be provided either when creating the encoder or when applying it;
application options override creation options.
Schema mismatches are represented by a `Failure` cause containing
`SchemaError`.

**Gotchas**

Schema issue fail reasons are wrapped as `SchemaError`. Defects,
interruptions, and other non-schema reasons remain in the returned `Cause`,
including when they are mixed with schema issues.

**See**

- `SchemaParser.encodeUnknownExit` for the adapter whose failure contains `SchemaIssue.Issue` directly

**Signature**

```ts
declare const encodeUnknownExit: <S extends ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Exit_.Exit<S["Encoded"], SchemaError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1850)

Since v4.0.0

## encodeUnknownOption

Encodes an `unknown` input against a schema, returning an `Option` that is
`Some` with the encoded value on success or `None` for schema mismatches.

**When to use**

Use when you do not know the input type statically and only need to know
whether encoding succeeded.

**Details**

Prefer this over `encodeUnknownExit` or `encodeUnknownEffect`
when you don't need error details. For values already typed as the schema's
`Type` use `encodeOption`.
Options may be provided either when creating the encoder or when applying it;
application options override creation options.

**Gotchas**

Only causes made entirely of schema issues are converted to `None`. Causes
that contain defects, interruptions, or other non-schema reasons throw
instead.

**Signature**

```ts
declare const encodeUnknownOption: <S extends ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Option_.Option<S["Encoded"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1918)

Since v3.10.0

## encodeUnknownPromise

Encodes an `unknown` input against a schema, returning a `Promise` that
resolves with the encoded value or rejects with a `SchemaError` for
schema mismatches.

**When to use**

Use when you need encoding of unknown input to return a JavaScript `Promise`
that rejects with `SchemaError` for schema mismatches.

**Details**

For values already typed as the schema's `Type` use `encodePromise`.
Options may be provided either when creating the encoder or when applying it;
application options override creation options.

**Gotchas**

Non-schema failures may reject with a runtime failure instead of
`SchemaError`.

**See**

- `SchemaParser.encodeUnknownPromise` for the adapter that rejects with an `Error` whose cause is `SchemaIssue.Issue`

**Signature**

```ts
declare const encodeUnknownPromise: <S extends ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Promise<S["Encoded"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2049)

Since v3.10.0

## encodeUnknownResult

Encodes an `unknown` input against a schema, returning a `Result` that
succeeds with the encoded value or fails with a `SchemaError` for schema
mismatches.

**When to use**

Use when you do not know the input type statically and want schema mismatches
returned as `Result.fail` with `SchemaError`.

**Details**

For values already typed as the schema's `Type` use `encodeResult`.
Options may be provided either when creating the encoder or when applying it;
application options override creation options.
Schema mismatches are returned as `Result.fail` with `SchemaError`.

**Gotchas**

Only causes made entirely of schema issues are returned as `Result.fail`.
Causes that contain defects, interruptions, or other non-schema reasons throw
instead.

**See**

- `SchemaParser.encodeUnknownResult` for the adapter that fails with `SchemaIssue.Issue` directly

**Signature**

```ts
declare const encodeUnknownResult: <S extends ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => Result_.Result<S["Encoded"], SchemaError>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1982)

Since v4.0.0

## encodeUnknownSync

Encodes an `unknown` input against a schema synchronously, throwing a
`SchemaError` for schema mismatches.

**When to use**

Use when you need to serialize unknown data at a synchronous boundary and
want schema mismatches to throw `SchemaError`.

**Details**

For alternatives that do not throw on schema mismatches, see
`encodeUnknownOption`, `encodeUnknownExit`, or
`encodeUnknownEffect`. For values already typed as the schema's `Type`
use `encodeSync`. Options may be provided either when creating the
encoder or when applying it; application options override creation options.

**Gotchas**

Non-schema failures may throw a runtime failure instead of `SchemaError`.

**See**

- `SchemaParser.encodeUnknownSync` for the adapter that throws an `Error` whose cause is `SchemaIssue.Issue`

**Signature**

```ts
declare const encodeUnknownSync: <S extends ConstraintEncoder<unknown>>(
  schema: S,
  options?: SchemaAST.ParseOptions
) => (input: unknown, options?: SchemaAST.ParseOptions) => S["Encoded"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2117)

Since v4.0.0

## middlewareEncoding

Intercepts the encoding pipeline of a schema.

**Details**

The provided function receives the current encoding `Effect` and `ParseOptions`,
and returns a new `Effect` — potentially adding service requirements (`RE`),
recovering from errors, or augmenting the result.

**Example** (Logging encode failures)

```ts
import { Effect, Schema } from "effect"

const Logged = Schema.String.pipe(
  Schema.middlewareEncoding((effect) => Effect.tapError(effect, (issue) => Effect.log("encode failed", issue)))
)
```

**See**

- `catchEncoding` for a simpler error-recovery variant

**Signature**

```ts
declare const middlewareEncoding: <S extends Constraint, RE>(
  encode: (
    effect: Effect.Effect<Option_.Option<S["Encoded"]>, SchemaIssue.Issue, S["EncodingServices"]>,
    options: SchemaAST.ParseOptions
  ) => Effect.Effect<Option_.Option<S["Encoded"]>, SchemaIssue.Issue, RE>
) => (schema: S) => middlewareEncoding<S, RE>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5204)

Since v4.0.0

## middlewareEncoding (interface)

Type-level representation returned by `middlewareEncoding`.

**Signature**

```ts
export interface middlewareEncoding<S extends Constraint, RE> extends BottomLazy<
  S["ast"],
  middlewareEncoding<S, RE>,
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"]
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: RE
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5157)

Since v4.0.0

# error handling

## catchDecoding

Recovers from a decoding error by providing a fallback value.

**Details**

The handler receives the `Issue` and returns an `Effect` that either
succeeds with a fallback value or re-fails with a (possibly different) issue.

**Example** (Returning a default on decode failure)

```ts
import { Effect, Option, Schema } from "effect"

const schema = Schema.Number.pipe(Schema.catchDecoding((_issue) => Effect.succeed(Option.some(0))))
```

**See**

- `catchDecodingWithContext` to add service requirements to the handler

**Signature**

```ts
declare const catchDecoding: <S extends Constraint>(
  f: (issue: SchemaIssue.Issue) => Effect.Effect<Option_.Option<S["Type"]>, SchemaIssue.Issue>
) => (self: S) => middlewareDecoding<S, S["DecodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5239)

Since v4.0.0

## catchDecodingWithContext

Recovers from a decoding error with a handler that may require Effect services.

**When to use**

Use when you need decoding fallback logic to require services from the Effect
context.

**Details**

The handler receives the `Issue` and returns an `Effect` that either succeeds
with a fallback value or re-fails with a (possibly different) issue. The
handler's services are added to the schema's decoding services.

**See**

- `catchDecoding` for recovery handlers that do not require services
- `middlewareDecoding` for intercepting or replacing the full decoding pipeline

**Signature**

```ts
declare const catchDecodingWithContext: <S extends Constraint, R = never>(
  f: (issue: SchemaIssue.Issue) => Effect.Effect<Option_.Option<S["Type"]>, SchemaIssue.Issue, R>
) => (self: S) => middlewareDecoding<S, S["DecodingServices"] | R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5265)

Since v4.0.0

## catchEncoding

Recovers from an encoding error by providing a fallback value.

**Details**

The handler receives the `Issue` and returns an `Effect` that either
succeeds with a fallback value or re-fails with a (possibly different) issue.

**See**

- `catchEncodingWithContext` to add service requirements to the handler

**Signature**

```ts
declare const catchEncoding: <S extends Constraint>(
  f: (issue: SchemaIssue.Issue) => Effect.Effect<Option_.Option<S["Encoded"]>, SchemaIssue.Issue>
) => (self: S) => middlewareEncoding<S, S["EncodingServices"]>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5284)

Since v4.0.0

## catchEncodingWithContext

Recovers from an encoding error with a handler that may require Effect services.

**When to use**

Use when you need encoding fallback logic to require services from the Effect
context.

**Details**

The handler receives the `Issue` and returns an `Effect` that either succeeds
with a fallback encoded value or re-fails with a (possibly different) issue.
The handler's services are added to the schema's encoding services.

**See**

- `catchEncoding` for recovery handlers that do not require services
- `middlewareEncoding` for intercepting or replacing the full encoding pipeline

**Signature**

```ts
declare const catchEncodingWithContext: <S extends Constraint, R = never>(
  f: (issue: SchemaIssue.Issue) => Effect.Effect<Option_.Option<S["Encoded"]>, SchemaIssue.Issue, R>
) => (self: S) => middlewareEncoding<S, S["EncodingServices"] | R>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5310)

Since v4.0.0

# errors

## SchemaError

Error thrown (or returned as the error channel value) when schema decoding
or encoding fails.

**Details**

The `issue` field contains a structured `SchemaIssue.Issue` tree describing
every validation failure, including the path to the problematic value,
expected types, and actual values received. `message` renders the issue tree
as a human-readable string.

Use `isSchemaError` to narrow an unknown value to `SchemaError`.

**Example** (Catching a SchemaError)

```ts
import { Schema } from "effect"

try {
  Schema.decodeUnknownSync(Schema.Number)("not a number")
} catch (err) {
  if (Schema.isSchemaError(err)) {
    console.log(err.message)
    // Expected number, actual "not a number"
  }
}
```

**Signature**

```ts
declare const SchemaError: typeof InternalSchema.SchemaError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1011)

Since v4.0.0

# file

## File

Schema for JavaScript `File` objects.

**Details**

The default JSON serializer encodes a `File` as `{ data, type, name, lastModified }`
where `data` is base64-encoded.

**Signature**

```ts
declare const File: File
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11006)

Since v4.0.0

## File (interface)

Type-level representation of `File`.

**Signature**

```ts
export interface File extends instanceOf<globalThis.File> {
  readonly Rebuild: File
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10991)

Since v4.0.0

# filtering

## check

Attaches one or more filter checks to a schema without changing the
TypeScript type.

**Example** (Adding checks to a schema)

```ts
import { Schema } from "effect"

const AgeSchema = Schema.Number.pipe(Schema.check(Schema.isGreaterThanOrEqualTo(0), Schema.isLessThanOrEqualTo(120)))
```

**Signature**

```ts
declare const check: <S extends Top>(
  checks_0: SchemaAST.Check<S["Type"]>,
  ...checks: Array<SchemaAST.Check<S["Type"]>>
) => (self: S) => S["Rebuild"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4958)

Since v4.0.0

## refine

Narrows the TypeScript type of a schema's output via a type guard predicate,
attaching the guard as a runtime filter check.

**Details**

The `annotations` parameter annotates the filter created by the refinement.
With the default formatter, failed refinements use `message` first,
`expected` second, and `<filter>` when neither is provided. `identifier`
names type-level failures before the refinement runs; it does not name the
failed refinement itself.

**Signature**

```ts
declare const refine: <S extends Constraint, T extends S["Type"]>(
  refinement: (value: S["Type"]) => value is T,
  annotations?: Annotations.Filter
) => (schema: S) => refine<T, S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5007)

Since v3.10.0

## refine (interface)

Type-level representation returned by `refine`.

**Signature**

```ts
export interface refine<T extends S["Type"], S extends Constraint> extends BottomLazy<
  S["ast"],
  refine<T, S>,
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: T
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": T
  readonly Iso: T
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4970)

Since v3.10.0

# guards

## asserts

Creates an assertion function that throws an error if the input does not match
the schema.

**When to use**

Use to validate unknown input at runtime while narrowing the value with a
TypeScript assertion signature.

**Details**

The input is narrowed if the assertion succeeds. If schema validation fails,
the assertion throws an `Error` whose cause is `SchemaIssue.Issue`.

**Gotchas**

Causes that contain defects, interruptions, or other non-schema reasons throw
with the underlying `Cause` attached instead of being converted to schema
validation errors.

**Example** (Asserting and narrowing an input)

```ts
import { Schema } from "effect"

const input: unknown = "hello"

// This will pass silently (no return value) and narrow input to string
Schema.asserts(Schema.String, input)
console.log(input.toUpperCase())

// This will throw an error
try {
  const invalid: unknown = 123
  Schema.asserts(Schema.String, invalid)
} catch (error) {
  console.log("Non-string assertion failed as expected")
}
```

**Signature**

```ts
declare const asserts: <S extends Constraint, I>(schema: S, input: I) => asserts input is I & S["Type"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1295)

Since v4.0.0

## is

Creates a type guard function that checks if a value conforms to a given
schema.

**Details**

This function returns a predicate that performs a type-safe check, narrowing
the type of the input value if the check passes. The predicate returns `false`
for schema mismatches.

**Gotchas**

Only causes made entirely of schema issues are converted to `false`. Causes
that contain defects, interruptions, or other non-schema reasons throw
instead.

**Example** (Defining a basic type guard)

```ts
import { Schema } from "effect"

const isString = Schema.is(Schema.String)

console.log(isString("hello")) // true
console.log(isString(42)) // false

// Type narrowing in action
const value: unknown = "hello"
if (isString(value)) {
  // value is now typed as string
  console.log(value.toUpperCase()) // "HELLO"
}
```

**Signature**

```ts
declare const is: <T>(schema: Schema<T>) => <I>(input: I) => input is I & T
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1250)

Since v3.10.0

## isSchema

Checks whether a value is a `Schema`.

**Signature**

```ts
declare const isSchema: (u: unknown) => u is Top
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2205)

Since v3.10.0

## isSchemaError

Returns `true` if `u` is a `SchemaError`.

**Example** (Narrowing Schema errors in a catch block)

```ts
import { Schema } from "effect"

try {
  Schema.decodeUnknownSync(Schema.Number)("oops")
} catch (err) {
  if (Schema.isSchemaError(err)) {
    console.log(err._tag) // "SchemaError"
  }
}
```

**Signature**

```ts
declare const isSchemaError: (u: unknown) => u is SchemaError
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L1034)

Since v4.0.0

# instances

## overrideToEquivalence

Overrides the equivalence derivation for a schema by supplying a custom
`Equivalence`.

**When to use**

Use when you need a custom equivalence instead of the default structural
equivalence derived by `toEquivalence`.

**Signature**

```ts
declare const overrideToEquivalence: <S extends Top>(
  toEquivalence: () => Equivalence.Equivalence<S["Type"]>
) => (self: S) => S["Rebuild"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13164)

Since v4.0.0

## toEquivalence

Derives an `Equivalence` from a schema. Two values are considered equal when
every field (and nested field) compares equal according to the schema
structure.

**Example** (Comparing structs)

```ts
import { Schema } from "effect"

const eq = Schema.toEquivalence(Schema.Struct({ id: Schema.Number, name: Schema.String }))

console.log(eq({ id: 1, name: "Alice" }, { id: 1, name: "Alice" })) // true
console.log(eq({ id: 1, name: "Alice" }, { id: 2, name: "Alice" })) // false
```

**Signature**

```ts
declare const toEquivalence: <T>(schema: Schema<T>) => Equivalence.Equivalence<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13187)

Since v4.0.0

# models

## $Array (interface)

Type-level representation returned by `Array`.

**Signature**

```ts
export interface $Array<S extends Constraint> extends BottomLazy<SchemaAST.Arrays, $Array<S>> {
  readonly Type: ReadonlyArray<S["Type"]>
  readonly Encoded: ReadonlyArray<S["Encoded"]>
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": ReadonlyArray<S["~type.make"]>
  readonly "~type.make": ReadonlyArray<S["~type.make"]>
  readonly Iso: ReadonlyArray<S["Iso"]>
  readonly value: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4431)

Since v4.0.0

## $Record (interface)

Type-level representation returned by `Record`.

**Signature**

```ts
export interface $Record<Key extends Record.Key, Value extends Constraint> extends BottomLazy<
  SchemaAST.Objects,
  $Record<Key, Value>
> {
  readonly Type: Record.Type<Key, Value>
  readonly Encoded: Record.Encoded<Key, Value>
  readonly DecodingServices: Record.DecodingServices<Key, Value>
  readonly EncodingServices: Record.EncodingServices<Key, Value>
  readonly "~type.make.in": Simplify<Record.MakeIn<Key, Value>>
  readonly "~type.make": Simplify<Record.MakeIn<Key, Value>>
  readonly Iso: Record.Iso<Key, Value>
  readonly key: Key
  readonly value: Value
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3725)

Since v4.0.0

## Any (interface)

Type-level representation of `Any`.

**Signature**

```ts
export interface Any extends Bottom<any, any, never, never, SchemaAST.Any, Any> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2881)

Since v3.10.0

## BigInt (interface)

Type-level representation of `BigInt`.

**Signature**

```ts
export interface BigInt extends Bottom<bigint, bigint, never, never, SchemaAST.BigInt, BigInt> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3033)

Since v4.0.0

## Boolean (interface)

Type-level representation of `Boolean`.

**Signature**

```ts
export interface Boolean extends Bottom<boolean, boolean, never, never, SchemaAST.Boolean, Boolean> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2994)

Since v4.0.0

## Bottom (interface)

The fully-parameterized base interface for all schemas. Exposes all 14 type
parameters controlling type inference, mutability, optionality, services, and
transformation behavior.

**When to use**

Use when you are writing advanced generic schema utilities or performing
schema introspection.

**Signature**

```ts
export interface Bottom<
  out T,
  out E,
  out RD,
  out RE,
  out Ast extends SchemaAST.AST,
  out Rebuild extends Top,
  out TypeMakeIn = T,
  out Iso = T,
  in out TypeParameters extends ReadonlyArray<Constraint> = readonly [],
  out TypeMake = TypeMakeIn,
  out TypeMutability extends Mutability = "readonly",
  out TypeOptionality extends Optionality = "required",
  out TypeConstructorDefault extends ConstructorDefault = "no-default",
  out EncodedMutability extends Mutability = "readonly",
  out EncodedOptionality extends Optionality = "required"
>
  extends Pipeable.Pipeable {
  readonly [TypeId]: typeof TypeId

  readonly ast: Ast
  readonly Rebuild: Rebuild
  readonly "~type.parameters": TypeParameters

  readonly Type: T
  readonly Encoded: E
  readonly DecodingServices: RD
  readonly EncodingServices: RE

  readonly "~type.make.in": TypeMakeIn
  readonly "~type.make": TypeMake // useful to type the `refine` interface
  readonly "~type.constructor.default": TypeConstructorDefault
  readonly Iso: Iso

  readonly "~type.mutability": TypeMutability
  readonly "~type.optionality": TypeOptionality
  readonly "~encoded.mutability": EncodedMutability
  readonly "~encoded.optionality": EncodedOptionality

  annotate(annotations: Annotations.Bottom<this["Type"], this["~type.parameters"]>): this["Rebuild"]
  annotateKey(annotations: Annotations.Key<this["Type"]>): this["Rebuild"]
  check(...checks: readonly [SchemaAST.Check<this["Type"]>, ...Array<SchemaAST.Check<this["Type"]>>]): this["Rebuild"]
  rebuild(ast: this["ast"]): this["Rebuild"]
  /**
   * Constructs a value from the make input representation synchronously.
   *
   * **When to use**
   *
   * Use when constructor input is trusted or when validation failure
   * should abort with a thrown `Error`.
   *
   * **Details**
   *
   * Applies constructor defaults and type-side validation according to
   * `MakeOptions`.
   *
   * **Gotchas**
   *
   * Throws an `Error` with the schema issue in its `cause` when validation
   * fails.
   * Causes that contain defects, interruptions, or other non-schema reasons
   * throw with the underlying `Cause` attached instead.
   *
   * @see {@link Bottom.makeOption} — construct synchronously and discard validation details
   * @see {@link Bottom.makeEffect} — construct through `Effect` when validation failure should stay in the error channel
   */
  make(input: this["~type.make.in"], options?: MakeOptions): this["Type"]
  /**
   * Constructs a value from the make input representation, returning `Option.none`
   * when validation fails.
   *
   * **When to use**
   *
   * Use when you only need to know whether construction succeeds
   * and do not need validation details.
   *
   * **Details**
   *
   * Applies constructor defaults and type-side validation according to
   * `MakeOptions`.
   *
   * **Gotchas**
   *
   * Only causes made entirely of schema issues are converted to `None`. Causes
   * that contain defects, interruptions, or other non-schema reasons throw
   * instead.
   *
   * @see {@link Bottom.make} — construct synchronously when validation failure should throw
   * @see {@link Bottom.makeEffect} — construct through `Effect` when validation details should stay in the error channel
   */
  makeOption(input: this["~type.make.in"], options?: MakeOptions): Option_.Option<this["Type"]>
  /**
   * Constructs a value from the make input representation, returning validation
   * failures in the `Effect` error channel.
   *
   * **When to use**
   *
   * Use when constructor input may fail validation and you want to
   * compose that failure with other `Effect` operations instead of throwing.
   *
   * @see {@link Bottom.make} — construct synchronously when validation failure should throw
   * @see {@link Bottom.makeOption} — construct synchronously and discard validation details
   */
  makeEffect(input: this["~type.make.in"], options?: MakeOptions): Effect.Effect<this["Type"], SchemaError>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L140)

Since v4.0.0

## Class (interface)

Type-level representation returned by `Class`.

**Signature**

```ts
export interface Class<Self, S extends Constraint & { readonly fields: Struct.Fields }, Inherited> extends BottomLazy<
  SchemaAST.Declaration,
  decodeTo<declareConstructor<Self, S["Encoded"], readonly [S], S["Iso"]>, S>,
  readonly [S],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: Self
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": RequiredKeys<S["~type.make.in"]> extends never
    ? void | S["~type.make.in"]
    : S["~type.make.in"]
  readonly "~type.make": Self
  readonly Iso: S["Iso"]
  new (
    ...args: {} extends S["~type.make.in"]
      ? [props?: S["~type.make.in"], options?: MakeOptions]
      : [props: S["~type.make.in"], options?: MakeOptions]
  ): S["Type"] & Inherited
  readonly identifier: string
  readonly fields: S["fields"]

  /**
   * Returns a new struct with the fields modified by the provided function.
   *
   * **Details**
   *
   * Options:
   *
   * - `unsafePreserveChecks` - if `true`, keep any `.check(...)` constraints
   *   that were attached to the original struct. Defaults to `false`.
   *
   *   **Warning**: This is an unsafe operation. Since `mapFields`
   *   transformations change the schema type, the original refinement functions
   *   may no longer be valid or safe to apply to the transformed schema. Only
   *   use this option if you have verified that your refinements remain correct
   *   after the transformation.
   */
  mapFields<To extends Struct.Fields>(
    f: (fields: S["fields"]) => To,
    options?:
      | {
          readonly unsafePreserveChecks?: boolean | undefined
        }
      | undefined
  ): Struct<Simplify<Readonly<To>>>

  /**
   * Returns a function that creates a schema-backed subclass with this class's
   * fields plus additional fields.
   *
   * **When to use**
   *
   * Use when you need a subclass whose constructor validates both inherited
   * fields and newly added fields.
   *
   * **Details**
   *
   * The returned function accepts either a field map or a `Struct`. When you
   * pass a `Struct`, checks attached to that extension schema are preserved and
   * combined with checks from the base class schema.
   *
   * **Gotchas**
   *
   * Checks from a `Struct` argument are evaluated against the full subclass
   * value after inherited and extension fields are merged. Object-wide checks
   * such as `isMaxProperties` count inherited fields too.
   */
  extend<Extended = never, Static = {}, Brand = {}>(
    identifier: string
  ): {
    <NewFields extends Struct.Fields>(
      fields: NewFields,
      annotations?: Annotations.Declaration<Extended, readonly [Struct<Simplify<Assign<S["fields"], NewFields>>>]>
    ): [Extended] extends [never]
      ? MissingSelfGeneric<"Base.extend">
      : InheritStaticMembers<Class<Extended, Struct<Simplify<Assign<S["fields"], NewFields>>>, Self & Brand>, Static>
    <Extension extends Struct<Struct.Fields>>(
      schema: Extension,
      annotations?: Annotations.Declaration<
        Extended,
        readonly [Struct<Simplify<Assign<S["fields"], Extension["fields"]>>>]
      >
    ): [Extended] extends [never]
      ? MissingSelfGeneric<"Base.extend">
      : InheritStaticMembers<
          Class<Extended, Struct<Simplify<Assign<S["fields"], Extension["fields"]>>>, Self & Brand>,
          Static
        >
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L12370)

Since v3.10.0

## Codec (interface)

A schema that tracks the decoded type `T`, the encoded type `E`, and the
Effect services required during decoding (`RD`) and encoding (`RE`).

**Details**

Use `Codec<T, E, RD, RE>` when you need to preserve full type information
about a schema — both what it decodes to and what it serializes from/to.
Most concrete schemas produced by this module implement `Codec`.

For APIs that only need one direction, prefer the narrower views:

- `ConstraintDecoder``<T, RD>` — decode-only
- `ConstraintEncoder``<E, RE>` — encode-only
- `Schema``<T>` — type-only (no encoded representation)

**Example** (Accepting a codec that decodes to `number` from `string`)

```ts
import { Schema } from "effect"

declare function serialize<T>(codec: Schema.Codec<T, string>): string

serialize(Schema.NumberFromString) // ok — decodes number, encoded as string
```

**See**

- `Codec.Encoded` — extract the encoded type
- `Codec.DecodingServices` — extract required decoding services
- `Codec.EncodingServices` — extract required encoding services
- `revealCodec` — helper to make TypeScript infer the full Codec type

**Signature**

```ts
export interface Codec<out T, out E = T, out RD = never, out RE = never> extends Schema<T> {
  readonly Encoded: E
  readonly DecodingServices: RD
  readonly EncodingServices: RE
  readonly Rebuild: Codec<T, E, RD, RE>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L943)

Since v4.0.0

## Constraint (interface)

Lightweight structural constraint for APIs that accept schema values but only
read their data and type-level views.

**When to use**

Use when you need to constrain a generic value to be a schema, but the API
only reads properties such as `ast`, `Type`, `Encoded`, service
requirements, constructor input views, or modifier flags.

**Details**

`Constraint` keeps the schema type identifier and the property surface needed
by schema constructors, while avoiding the full `Bottom` protocol. Use
`Top` when an API calls schema methods such as `annotate`, `check`,
`rebuild`, `make`, or `makeEffect`.

**See**

- `Top` for the complete schema protocol.

**Signature**

```ts
export interface Constraint {
  readonly [TypeId]: typeof TypeId
  readonly ast: SchemaAST.AST

  readonly Type: unknown
  readonly Encoded: unknown
  readonly DecodingServices: unknown
  readonly EncodingServices: unknown

  readonly "~type.parameters": any
  readonly "~type.make.in": unknown
  readonly "~type.make": unknown
  readonly Iso: unknown

  readonly "~type.optionality": Optionality
  readonly "~type.mutability": Mutability
  readonly "~type.constructor.default": ConstructorDefault
  readonly "~encoded.optionality": Optionality
  readonly "~encoded.mutability": Mutability
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L665)

Since v4.0.0

## ConstraintCodec (interface)

Lightweight structural constraint for APIs that need codec type views but do
not need the full schema protocol.

**When to use**

Use when you need to preserve decoded type, encoded type, and service
requirements for a schema value, but the API does not call schema methods
such as `annotate`, `check`, `rebuild`, `make`, or `makeEffect`.

**See**

- `Constraint` for the generic lightweight schema constraint.
- `Codec` for the full schema protocol with codec type views.

**Signature**

```ts
export interface ConstraintCodec<out T, out E = T, out RD = never, out RE = never> extends Constraint {
  readonly Type: T
  readonly Encoded: E
  readonly DecodingServices: RD
  readonly EncodingServices: RE
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L702)

Since v4.0.0

## ConstraintDecoder (interface)

Lightweight structural constraint for APIs that need decoder type views but
do not need the full schema protocol.

**When to use**

Use when you need to preserve a schema's decoded type and decoding services,
but the API does not constrain the encoded type, encoding services, or call
schema methods such as `annotate`, `check`, `rebuild`, `make`, or
`makeEffect`.

**See**

- `ConstraintCodec` for APIs that need both decoded and encoded codec views.
- `Codec` for the full schema protocol with codec type views.

**Signature**

```ts
export interface ConstraintDecoder<out T, out RD = never> extends ConstraintCodec<T, unknown, RD, unknown> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L726)

Since v4.0.0

## ConstraintEncoder (interface)

Lightweight structural constraint for APIs that need encoder type views but
do not need the full schema protocol.

**When to use**

Use when you need to preserve a schema's encoded type and encoding services,
but the API does not constrain the decoded type, decoding services, or call
schema methods such as `annotate`, `check`, `rebuild`, `make`, or
`makeEffect`.

**See**

- `ConstraintCodec` for APIs that need both decoded and encoded codec views.
- `Codec` for the full schema protocol with codec type views.

**Signature**

```ts
export interface ConstraintEncoder<out E, out RE = never> extends ConstraintCodec<unknown, E, unknown, RE> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L745)

Since v4.0.0

## ConstraintRebuildable (interface)

Lightweight structural constraint for APIs that need schema views and the
rebuilt schema type, but do not call the full schema protocol.

**When to use**

Use when an API needs to read `Rebuild` in addition to the schema views
exposed by `Constraint`, but does not call methods such as `annotate`,
`check`, `rebuild`, `make`, or `makeEffect`.

**Signature**

```ts
export interface ConstraintRebuildable extends Constraint {
  readonly Rebuild: Constraint
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L760)

Since v4.0.0

## ConstructorDefault (type alias)

Whether a schema field has a constructor default value.

**See**

- `withConstructorDefault` — add a default to a schema field
- `tag` — creates a literal field with a constructor default

**Signature**

```ts
type ConstructorDefault = "no-default" | "with-default"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L100)

Since v4.0.0

## Enum (interface)

Type-level representation returned by `Enum`.

**Signature**

```ts
export interface Enum<A extends { [x: string]: string | number }> extends Bottom<
  A[keyof A],
  A[keyof A],
  never,
  never,
  SchemaAST.Enum,
  Enum<A>
> {
  readonly enums: A
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2822)

Since v4.0.0

## FilterIssue (type alias)

A single failure reported by a filter predicate. Used as the element type
of the array arm of `FilterOutput`, and also accepted on its own.

**Details**

- `string`: failure with that string as the message. Produces an
  `SchemaIssue.InvalidValue` wrapping the input, with the string used as
  the issue's `message` annotation.
- `SchemaIssue.Issue`: a fully-formed issue, returned as-is.
- `{ path, issue }`: failure attached to a nested path. `issue` is either
  a `string` (wrapped in an `SchemaIssue.InvalidValue`) or a full
  `SchemaIssue.Issue`; the result is wrapped in an `SchemaIssue.Pointer`
  at the given `path`.

**Signature**

```ts
type FilterIssue =
  | string
  | SchemaIssue.Issue
  | {
      readonly path: ReadonlyArray<PropertyKey>
      readonly issue: string | SchemaIssue.Issue
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6411)

Since v3.10.0

## FilterOutput (type alias)

The value a filter predicate (see `makeFilter`) may return.

**Details**

Each shape is normalized into an `SchemaIssue.Issue` (or `undefined` for
success) before being attached to the parse result:

- `undefined`: success. The input satisfies the filter.
- `true`: success. Equivalent to `undefined`, useful when the predicate is
  a plain boolean expression.
- `false`: generic failure. Produces an `SchemaIssue.InvalidValue` wrapping
  the input, with no custom message.
- `FilterIssue`: a single failure. See `FilterIssue` for the
  shapes (`string`, `SchemaIssue.Issue`, or `{ path, issue }`).
- `ReadonlyArray<FilterIssue>`: several failures reported together. An
  empty array is treated as success; a single-element array is equivalent
  to returning that element directly; otherwise the entries are grouped
  into an `SchemaIssue.Composite`.

**Signature**

```ts
type FilterOutput = undefined | boolean | FilterIssue | ReadonlyArray<FilterIssue>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6439)

Since v3.10.0

## Json (type alias)

Recursive TypeScript type for any valid immutable JSON value: `null`,
`number`, `boolean`, `string`, a readonly array of `Json` values, or a
readonly record of `string → Json`. For the corresponding schema, see the
`Json` const.

**Signature**

```ts
type Json = null | number | boolean | string | JsonArray | JsonObject
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14015)

Since v4.0.0

## JsonArray (interface)

A readonly array of `Json` values.

**Signature**

```ts
export interface JsonArray extends ReadonlyArray<Json> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14023)

Since v4.0.0

## JsonObject (interface)

A readonly record whose values are `Json` values.

**Signature**

```ts
export interface JsonObject {
  readonly [x: string]: Json
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14031)

Since v4.0.0

## Literal (interface)

Type-level representation returned by `Literal`.

**Signature**

```ts
export interface Literal<L extends SchemaAST.LiteralValue> extends Bottom<
  L,
  L,
  never,
  never,
  SchemaAST.Literal,
  Literal<L>
> {
  readonly literal: L
  transform<L2 extends SchemaAST.LiteralValue>(to: L2): decodeTo<Literal<L2>, Literal<L>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2576)

Since v3.10.0

## Literals (interface)

Type-level representation returned by `Literals`.

**Signature**

```ts
export interface Literals<L extends ReadonlyArray<SchemaAST.LiteralValue>> extends Bottom<
  L[number],
  L[number],
  never,
  never,
  SchemaAST.Union<SchemaAST.Literal>,
  Literals<L>
> {
  readonly literals: L
  readonly members: { readonly [K in keyof L]: Literal<L[K]> }
  /**
   * Map over the members of the union.
   */
  mapMembers<To extends ReadonlyArray<Constraint>>(f: (members: this["members"]) => To): Union<Simplify<Readonly<To>>>

  pick<const L2 extends ReadonlyArray<L[number]>>(literals: L2): Literals<L2>

  transform<const L2 extends { readonly [I in keyof L]: SchemaAST.LiteralValue }>(
    to: L2
  ): Union<{ [I in keyof L]: decodeTo<Literal<L2[I]>, Literal<L[I]>> }>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4762)

Since v4.0.0

## Mutability (type alias)

Whether a schema field is readonly or mutable within a struct.

**See**

- `mutableKey` — mark a struct field as mutable

**Signature**

```ts
type Mutability = "readonly" | "mutable"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L89)

Since v4.0.0

## MutableJson (type alias)

Recursive TypeScript type for mutable JSON values: `null`, `number`,
`boolean`, `string`, mutable arrays, or mutable string-keyed records.

**Signature**

```ts
type MutableJson = null | number | boolean | string | MutableJsonArray | MutableJsonObject
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14066)

Since v4.0.0

## MutableJsonArray (interface)

A mutable array of `MutableJson` values.

**Signature**

```ts
export interface MutableJsonArray extends Array<MutableJson> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14074)

Since v4.0.0

## MutableJsonObject (interface)

A mutable record whose values are `MutableJson` values.

**Signature**

```ts
export interface MutableJsonObject {
  [x: string]: MutableJson
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14082)

Since v4.0.0

## Never (interface)

Type-level representation of `Never`.

**Signature**

```ts
export interface Never extends Bottom<never, never, never, never, SchemaAST.Never, Never> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2865)

Since v3.10.0

## NonEmptyArray (interface)

Type-level representation returned by `NonEmptyArray`.

**Signature**

```ts
export interface NonEmptyArray<S extends Constraint> extends BottomLazy<SchemaAST.Arrays, NonEmptyArray<S>> {
  readonly Type: readonly [S["Type"], ...Array<S["Type"]>]
  readonly Encoded: readonly [S["Encoded"], ...Array<S["Encoded"]>]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": readonly [S["~type.make"], ...Array<S["~type.make"]>]
  readonly "~type.make": readonly [S["~type.make"], ...Array<S["~type.make"]>]
  readonly Iso: readonly [S["Iso"], ...Array<S["Iso"]>]
  readonly value: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4488)

Since v3.10.0

## Null (interface)

Type-level representation of `Null`.

**Signature**

```ts
export interface Null extends Bottom<null, null, never, never, SchemaAST.Null, Null> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2920)

Since v3.10.0

## NullOr (interface)

Type-level representation returned by `NullOr`.

**Signature**

```ts
export interface NullOr<S extends Constraint> extends Union<readonly [S, Null]> {
  readonly Rebuild: NullOr<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4823)

Since v3.10.0

## NullishOr (interface)

Type-level representation returned by `NullishOr`.

**Signature**

```ts
export interface NullishOr<S extends Constraint> extends Union<readonly [S, Null, Undefined]> {
  readonly Rebuild: NullishOr<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4869)

Since v3.10.0

## Number (interface)

Type-level representation of `Number`.

**Signature**

```ts
export interface Number extends Bottom<number, number, never, never, SchemaAST.Number, Number> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2970)

Since v4.0.0

## ObjectKeyword (interface)

Type-level representation of `ObjectKeyword`.

**Signature**

```ts
export interface ObjectKeyword extends Bottom<object, object, never, never, SchemaAST.ObjectKeyword, ObjectKeyword> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3085)

Since v4.0.0

## Opaque (interface)

Type-level representation returned by `Opaque`.

**Signature**

```ts
export interface Opaque<Self, S extends Top, Brand> extends BottomLazy<
  S["ast"],
  S["Rebuild"],
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: Self
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
  new (_: never): S["Type"] & Brand
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6217)

Since v4.0.0

## Optic (interface)

A schema that additionally supports optic (lens/prism) operations.

**Details**

`Optic<T, Iso>` extends `Schema``<T>` with an `Iso` type that
describes the isomorphic counterpart used by the optic layer. Crucially,
decoding and encoding require _no_ Effect services (`DecodingServices` and
`EncodingServices` are both `never`), which means the optic can operate
purely without an Effect runtime.

Most primitive schemas (e.g. `Schema.String`, `Schema.Number`) implement
`Optic` automatically. You normally interact with this interface through
`Optic_` utilities rather than constructing it directly.

**Signature**

```ts
export interface Optic<out T, out Iso> extends Schema<T> {
  readonly Iso: Iso
  readonly DecodingServices: never
  readonly EncodingServices: never
  readonly Rebuild: Optic<T, Iso>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L903)

Since v4.0.0

## Optionality (type alias)

Whether a schema field is required or optional within a struct.

**See**

- `optionalKey` — mark a struct field as optional
- `optional` — mark a struct field as optional with `| undefined`

**Signature**

```ts
type Optionality = "required" | "optional"
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L79)

Since v4.0.0

## Schema (interface)

A typed view of a schema that tracks only the decoded (output) type `T`.

**Details**

Use `Schema<T>` as a constraint when you want to accept "any schema that
decodes to `T`" and do not need to know or constrain the encoded
representation, required services, or any other type parameters.

This is a structural interface — concrete schema values are produced by the
constructors in this module (e.g. `Struct`, `String`, `Number`).
When you also need the encoded type or service requirements, use `Codec`.

**Example** (Accepting any schema decoding to `string`)

```ts
import { Schema } from "effect"

declare function print(schema: Schema.Schema<string>): void

print(Schema.String) // ok
print(Schema.NonEmptyString) // ok
```

**See**

- `Codec` — also tracks Encoded, DecodingServices, EncodingServices
- `Schema.Type` — extract the decoded type at the type level

**Signature**

```ts
export interface Schema<out T> extends Top {
  readonly Type: T
  readonly Rebuild: Schema<T>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L819)

Since v3.10.0

## String (interface)

Type-level representation of `String`.

**Signature**

```ts
export interface String extends Bottom<string, string, never, never, SchemaAST.String, String> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2954)

Since v4.0.0

## Struct (interface)

Type-level representation returned by `Struct`.

**Signature**

````ts
export interface Struct<Fields extends Struct.Fields> extends BottomLazy<SchemaAST.Objects, Struct<Fields>> {
  readonly Type: Struct.Type<Fields>
  readonly Encoded: Struct.Encoded<Fields>
  readonly DecodingServices: Struct.DecodingServices<Fields>
  readonly EncodingServices: Struct.EncodingServices<Fields>
  readonly "~type.make.in": Struct.MakeIn<Fields>
  readonly "~type.make": Struct.MakeIn<Fields>
  readonly Iso: Struct.Iso<Fields>
  /**
   * The field definitions of this struct. Spread them into a new struct to
   * reuse fields across schemas.
   *
   * **Example** (Reusing fields across structs)
   *
   * ```ts
   * import { Schema } from "effect"
   *
   * const Timestamped = Schema.Struct({
   *   createdAt: Schema.Date,
   *   updatedAt: Schema.Date
   * })
   *
   * const User = Schema.Struct({
   *   ...Timestamped.fields,
   *   name: Schema.String,
   *   email: Schema.String
   * })
   * ```
   */
  readonly fields: Fields
  /**
   * Returns a new struct with the fields modified by the provided function.
   *
   * **Details**
   *
   * Options:
   *
   * - `unsafePreserveChecks` - if `true`, keep any `.check(...)` constraints
   *   that were attached to the original union. Defaults to `false`.
   *
   *   **Warning**: This is an unsafe operation. Since `mapFields`
   *   transformations change the schema type, the original refinement functions
   *   may no longer be valid or safe to apply to the transformed schema. Only
   *   use this option if you have verified that your refinements remain correct
   *   after the transformation.
   */
  mapFields<To extends Struct.Fields>(
    f: (fields: Fields) => To,
    options?:
      | {
          readonly unsafePreserveChecks?: boolean | undefined
        }
      | undefined
  ): Struct<Simplify<Readonly<To>>>
}
````

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3294)

Since v3.10.0

## StructWithRest (interface)

Type-level representation returned by `StructWithRest`.

**Signature**

```ts
export interface StructWithRest<
  S extends StructWithRest.Objects,
  Records extends StructWithRest.Records
> extends BottomLazy<SchemaAST.Objects, StructWithRest<S, Records>> {
  readonly Type: Simplify<StructWithRest.Type<S, Records>>
  readonly Encoded: Simplify<StructWithRest.Encoded<S, Records>>
  readonly DecodingServices: StructWithRest.DecodingServices<S, Records>
  readonly EncodingServices: StructWithRest.EncodingServices<S, Records>
  readonly "~type.make.in": Simplify<StructWithRest.MakeIn<S, Records>>
  readonly "~type.make": Simplify<StructWithRest.MakeIn<S, Records>>
  readonly Iso: Simplify<StructWithRest.Iso<S, Records>>
  readonly schema: S
  readonly records: Records
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3969)

Since v4.0.0

## Symbol (interface)

Type-level representation of `Symbol`.

**Signature**

```ts
export interface Symbol extends Bottom<symbol, symbol, never, never, SchemaAST.Symbol, Symbol> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3016)

Since v4.0.0

## TaggedStruct (type alias)

Type-level representation returned by `TaggedStruct`.

**Signature**

```ts
type TaggedStruct<Tag, Fields> = Struct<Simplify<{ readonly _tag: tag<Tag> } & Fields>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5959)

Since v3.10.0

## TaggedUnion (interface)

Type-level representation returned by `TaggedUnion`.

**Signature**

```ts
export interface TaggedUnion<Cases extends Record<string, Constraint>> extends BottomLazy<
  SchemaAST.Union<SchemaAST.Objects>,
  TaggedUnion<Cases>
> {
  readonly Type: { [K in keyof Cases]: Cases[K]["Type"] }[keyof Cases]
  readonly Encoded: { [K in keyof Cases]: Cases[K]["Encoded"] }[keyof Cases]
  readonly DecodingServices: { [K in keyof Cases]: Cases[K]["DecodingServices"] }[keyof Cases]
  readonly EncodingServices: { [K in keyof Cases]: Cases[K]["EncodingServices"] }[keyof Cases]
  readonly "~type.make.in": { [K in keyof Cases]: Cases[K]["~type.make"] }[keyof Cases]
  readonly "~type.make": { [K in keyof Cases]: Cases[K]["~type.make"] }[keyof Cases]
  readonly Iso: { [K in keyof Cases]: Cases[K]["Type"] }[keyof Cases]
  readonly cases: Cases
  readonly isAnyOf: <const Keys>(
    keys: ReadonlyArray<Keys>
  ) => (value: Cases[keyof Cases]["Type"]) => value is Extract<Cases[keyof Cases]["Type"], { _tag: Keys }>
  readonly guards: { [K in keyof Cases]: (u: unknown) => u is Cases[K]["Type"] }
  readonly match: {
    <Output>(cases: { [K in keyof Cases]: (value: Cases[K]["Type"]) => Output }): (
      value: Cases[keyof Cases]["Type"]
    ) => Output
    <Output>(
      value: Cases[keyof Cases]["Type"],
      cases: { [K in keyof Cases]: (value: Cases[K]["Type"]) => Output }
    ): Output
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6143)

Since v4.0.0

## TemplateLiteral (interface)

Type-level representation returned by `TemplateLiteral`.

**Signature**

```ts
export interface TemplateLiteral<Parts extends TemplateLiteral.Parts> extends Bottom<
  TemplateLiteral.Encoded<Parts>,
  TemplateLiteral.Encoded<Parts>,
  never,
  never,
  SchemaAST.TemplateLiteral,
  TemplateLiteral<Parts>
> {
  readonly parts: Parts
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2684)

Since v3.10.0

## TemplateLiteralParser (interface)

Type-level representation returned by `TemplateLiteralParser`.

**Signature**

```ts
export interface TemplateLiteralParser<Parts extends TemplateLiteral.Parts> extends BottomLazy<
  SchemaAST.Arrays,
  TemplateLiteralParser<Parts>
> {
  readonly Type: TemplateLiteralParser.Type<Parts>
  readonly Encoded: TemplateLiteral.Encoded<Parts>
  readonly DecodingServices: never
  readonly EncodingServices: never
  readonly "~type.make.in": TemplateLiteralParser.Type<Parts>
  readonly "~type.make": TemplateLiteralParser.Type<Parts>
  readonly Iso: TemplateLiteralParser.Type<Parts>
  readonly parts: Parts
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2767)

Since v3.10.0

## Top (interface)

The existential "any schema" type — all type parameters are erased to `unknown`.

**Details**

Use `Top` as a constraint when writing generic utilities that must accept _any_
schema regardless of its `Type`, `Encoded`, or service requirements. It is the
widest possible schema type and therefore gives you the least static information.

In user code prefer the narrower interfaces:

- `Schema``<T>` — when you only care about the decoded type
- `Codec``<T, E, RD, RE>` — when you need the encoded type and service requirements
- `ConstraintDecoder``<T, RD>` — for decode-only APIs
- `ConstraintEncoder``<E, RE>` — for encode-only APIs

**Signature**

```ts
export interface Top extends Bottom<
  unknown,
  unknown,
  unknown,
  unknown,
  SchemaAST.AST,
  Top,
  unknown,
  unknown,
  any, // this is because TypeParameters is invariant
  unknown,
  Mutability,
  Optionality,
  ConstructorDefault,
  Mutability,
  Optionality
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L623)

Since v4.0.0

## Tuple (interface)

Type-level representation returned by `Tuple`.

**Signature**

```ts
export interface Tuple<Elements extends Tuple.Elements> extends BottomLazy<SchemaAST.Arrays, Tuple<Elements>> {
  readonly Type: Tuple.Type<Elements>
  readonly Encoded: Tuple.Encoded<Elements>
  readonly DecodingServices: Tuple.DecodingServices<Elements>
  readonly EncodingServices: Tuple.EncodingServices<Elements>
  readonly "~type.make.in": Tuple.MakeIn<Elements>
  readonly "~type.make": Tuple.MakeIn<Elements>
  readonly Iso: Tuple.Iso<Elements>
  readonly elements: Elements
  /**
   * Returns a new tuple with the elements modified by the provided function.
   *
   * **Details**
   *
   * Options:
   *
   * - `unsafePreserveChecks` - if `true`, keep any `.check(...)` constraints
   *   that were attached to the original union. Defaults to `false`.
   *
   *   **Warning**: This is an unsafe operation. Since `mapFields`
   *   transformations change the schema type, the original refinement functions
   *   may no longer be valid or safe to apply to the transformed schema. Only
   *   use this option if you have verified that your refinements remain correct
   *   after the transformation.
   */
  mapElements<To extends Tuple.Elements>(
    f: (elements: Elements) => To,
    options?:
      | {
          readonly unsafePreserveChecks?: boolean | undefined
        }
      | undefined
  ): Tuple<Simplify<Readonly<To>>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4164)

Since v3.10.0

## TupleWithRest (interface)

Type-level representation returned by `TupleWithRest`.

**Signature**

```ts
export interface TupleWithRest<S extends TupleWithRest.TupleType, Rest extends TupleWithRest.Rest> extends BottomLazy<
  SchemaAST.Arrays,
  TupleWithRest<S, Rest>
> {
  readonly Type: TupleWithRest.Type<S["Type"], Rest>
  readonly Encoded: TupleWithRest.Encoded<S["Encoded"], Rest>
  readonly DecodingServices: S["DecodingServices"] | Rest[number]["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"] | Rest[number]["EncodingServices"]
  readonly "~type.make.in": TupleWithRest.MakeIn<S["~type.make"], Rest>
  readonly "~type.make": TupleWithRest.MakeIn<S["~type.make"], Rest>
  readonly Iso: TupleWithRest.Iso<S["Iso"], Rest>
  readonly schema: S
  readonly rest: Rest
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4368)

Since v4.0.0

## Undefined (interface)

Type-level representation of `Undefined`.

**Signature**

```ts
export interface Undefined extends Bottom<undefined, undefined, never, never, SchemaAST.Undefined, Undefined> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2937)

Since v3.10.0

## UndefinedOr (interface)

Type-level representation returned by `UndefinedOr`.

**Signature**

```ts
export interface UndefinedOr<S extends Constraint> extends Union<readonly [S, Undefined]> {
  readonly Rebuild: UndefinedOr<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4846)

Since v3.10.0

## Union (interface)

Type-level representation returned by `Union`.

**Signature**

```ts
export interface Union<Members extends ReadonlyArray<Constraint>> extends BottomLazy<
  SchemaAST.Union<{ [K in keyof Members]: Members[K]["ast"] }[number]>,
  Union<Members>
> {
  readonly Type: { [K in keyof Members]: Members[K]["Type"] }[number]
  readonly Encoded: { [K in keyof Members]: Members[K]["Encoded"] }[number]
  readonly DecodingServices: { [K in keyof Members]: Members[K]["DecodingServices"] }[number]
  readonly EncodingServices: { [K in keyof Members]: Members[K]["EncodingServices"] }[number]
  readonly "~type.make.in": { [K in keyof Members]: Members[K]["~type.make"] }[number]
  readonly "~type.make": { [K in keyof Members]: Members[K]["~type.make"] }[number]
  readonly Iso: { [K in keyof Members]: Members[K]["Iso"] }[number]
  readonly members: Members
  /**
   * Returns a new union with the members modified by the provided function.
   *
   * **Details**
   *
   * Options:
   *
   * - `unsafePreserveChecks` - if `true`, keep any `.check(...)` constraints
   *   that were attached to the original union. Defaults to `false`.
   *
   *   **Warning**: This is an unsafe operation. Since `mapFields`
   *   transformations change the schema type, the original refinement functions
   *   may no longer be valid or safe to apply to the transformed schema. Only
   *   use this option if you have verified that your refinements remain correct
   *   after the transformation.
   */
  mapMembers<To extends ReadonlyArray<Constraint>>(
    f: (members: Members) => To,
    options?:
      | {
          readonly unsafePreserveChecks?: boolean | undefined
        }
      | undefined
  ): Union<Simplify<Readonly<To>>>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4665)

Since v3.10.0

## UniqueArray (interface)

Type-level representation returned by `UniqueArray`.

**Signature**

```ts
export interface UniqueArray<S extends Constraint> extends $Array<S> {
  readonly Rebuild: UniqueArray<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4583)

Since v4.0.0

## UniqueSymbol (interface)

Type-level representation returned by `UniqueSymbol`.

**Signature**

```ts
export interface UniqueSymbol<sym extends symbol> extends Bottom<
  sym,
  sym,
  never,
  never,
  SchemaAST.UniqueSymbol,
  UniqueSymbol<sym>
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3102)

Since v4.0.0

## Unknown (interface)

Type-level representation of `Unknown`.

**Signature**

```ts
export interface Unknown extends Bottom<unknown, unknown, never, never, SchemaAST.Unknown, Unknown> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2898)

Since v3.10.0

## UnknownFromJsonString (interface)

Type-level representation of `UnknownFromJsonString`.

**Signature**

```ts
export interface UnknownFromJsonString extends fromJsonString<Unknown> {
  readonly Rebuild: UnknownFromJsonString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10870)

Since v4.0.0

## Void (interface)

Type-level representation of `Void`.

**Signature**

```ts
export interface Void extends Bottom<void, void, never, never, SchemaAST.Void, Void> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3056)

Since v3.10.0

## WithoutConstructorDefault (interface)

Constraint used to ensure a schema field does not already have a constructor default.

**Details**

Only schemas that satisfy this constraint can be passed to `withConstructorDefault`.

**Signature**

```ts
export interface WithoutConstructorDefault {
  readonly "~type.constructor.default": "no-default"
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5581)

Since v4.0.0

## fromJsonString (interface)

Type-level representation returned by `fromJsonString`.

**Signature**

```ts
export interface fromJsonString<S extends Constraint> extends decodeTo<S, String> {
  readonly Rebuild: fromJsonString<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10907)

Since v4.0.0

## instanceOf (interface)

Type-level representation returned by `instanceOf`.

**Signature**

```ts
export interface instanceOf<T, Iso = T> extends declare<T, Iso> {
  readonly Rebuild: instanceOf<T, Iso>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6277)

Since v3.10.0

## mutableKey (interface)

Type-level representation returned by `mutableKey`.

**Signature**

```ts
export interface mutableKey<S extends Constraint> extends BottomLazy<
  S["ast"],
  mutableKey<S>,
  S["~type.parameters"],
  "mutable",
  S["~type.optionality"],
  S["~type.constructor.default"],
  "mutable",
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"]
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2362)

Since v4.0.0

## optional (interface)

Type-level representation returned by `optional`.

**Signature**

```ts
export interface optional<S extends Constraint> extends optionalKey<UndefinedOr<S>> {
  readonly Rebuild: optional<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2293)

Since v3.10.0

## optionalKey (interface)

Type-level representation returned by `optionalKey`.

**Signature**

```ts
export interface optionalKey<S extends Constraint> extends BottomLazy<
  S["ast"],
  optionalKey<S>,
  S["~type.parameters"],
  S["~type.mutability"],
  "optional",
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  "optional"
> {
  readonly Type: S["Type"]
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2215)

Since v4.0.0

## suspend (interface)

Type-level representation returned by `suspend`.

**Signature**

```ts
export interface suspend<S extends Constraint> extends BottomLazy<
  SchemaAST.Suspend,
  suspend<S>,
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"]
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4892)

Since v3.10.0

# options

## DecodingDefaultOptions (type alias)

Options for `withDecodingDefaultKey` and `withDecodingDefault`.

**Details**

- `encodingStrategy`:
  - `"passthrough"` (default): pass the value through during encoding
  - `"omit"`: omit the key from the encoded output

**Signature**

```ts
type DecodingDefaultOptions = {
  readonly encodingStrategy?: "omit" | "passthrough" | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5673)

Since v4.0.0

## ErrorOptions (interface)

Options for `Error` and `Defect`.

**Signature**

```ts
export interface ErrorOptions {
  /**
   * Includes string stack traces in encoded `Error` values when set to `true`.
   *
   * @default false
   */
  readonly includeStack?: boolean | undefined
  /**
   * Excludes `Error.cause` values from encoded `Error` values when set to
   * `true`.
   *
   * @default false
   */
  readonly excludeCause?: boolean | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L9340)

Since v4.0.0

## MakeOptions (interface)

Options for `makeEffect`, `make`, and Class constructors.

**When to use**

Use when passing `disableChecks: true` to skip validation when you trust the data.

- Pass `parseOptions` to control error reporting behavior.

**See**

- `Bottom.makeEffect`
- `Bottom.make`

**Signature**

```ts
export interface MakeOptions {
  /**
   * The parse options to use for the schema.
   */
  readonly parseOptions?: SchemaAST.ParseOptions | undefined
  /**
   * Whether to disable validation for the schema.
   */
  readonly disableChecks?: boolean | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L116)

Since v3.13.4

## ToJsonSchemaOptions (interface)

Options for `toJsonSchemaDocument`.

**Signature**

````ts
export interface ToJsonSchemaOptions {
  /**
   * Controls how additional properties are handled while resolving the JSON
   * schema.
   *
   * **Details**
   *
   * Possible values include:
   * - `false`: Disallow additional properties (default)
   * - `true`: Allow additional properties
   * - `JsonSchema`: Use the provided JSON Schema for additional properties
   */
  readonly additionalProperties?: boolean | JsonSchema.JsonSchema | undefined
  /**
   * Controls whether to generate descriptions for checks (if the user has not
   * provided them) based on the `expected` annotation of the check.
   */
  readonly generateDescriptions?: boolean | undefined
  /**
   * A predicate that controls which additional annotation keys (beyond the
   * standard JSON Schema keys) are included in the generated output.
   *
   * **When to use**
   *
   * Use when you need to include non-standard annotation keys in the generated
   * JSON Schema, such as Monaco Editor properties (`markdownDescription`,
   * `defaultSnippets`) or vendor extensions (`x-*`).
   *
   * **Details**
   *
   * Standard JSON Schema keys (`title`, `description`, `default`, `examples`,
   * `readOnly`, `writeOnly`, `format`, `contentEncoding`, `contentMediaType`,
   * `contentSchema`) are always included. This predicate is checked for any
   * *other* annotation key.
   *
   * **Gotchas**
   *
   * Prefer whitelisting the custom annotation keys you want to emit instead of
   * using a broad predicate such as `() => true`, because broad predicates can
   * include Effect-specific annotations that are preserved for internal schema
   * generation.
   *
   * **Example** (Including custom annotations)
   *
   * ```ts
   * import { Schema } from "effect"
   *
   * const schema = Schema.String.annotate({
   *   description: "A name",
   *   markdownDescription: "The **name** field"
   * })
   *
   * const doc = Schema.toJsonSchemaDocument(schema, {
   *   includeAnnotationKey: (key) =>
   *     key === "markdownDescription" || key.startsWith("x-")
   * })
   *
   * console.log(doc.schema)
   * // {
   * //   type: "string",
   * //   description: "A name",
   * //   markdownDescription: "The **name** field"
   * // }
   * ```
   */
  readonly includeAnnotationKey?: ((key: string) => boolean) | undefined
}
````

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L13217)

Since v4.0.0

# schemas

## Any

Schema for the `any` type. Accepts any value without validation.

**See**

- `Unknown` for a safer alternative that uses `unknown`.

**Signature**

```ts
declare const Any: Any
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2890)

Since v3.10.0

## BigInt

Schema for `bigint` values. Validates that the input is `typeof` `"bigint"`.

**When to use**

Use when the input is already a bigint and the schema should validate and
preserve bigint values without parsing from another representation.

**See**

- `BigIntFromString` for parsing string input into a bigint

**Signature**

```ts
declare const BigInt: BigInt
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3048)

Since v4.0.0

## Json

Schema that accepts and validates any immutable JSON-compatible value.

**Example** (Validating a JSON value)

```ts
import { Schema } from "effect"

const result = Schema.decodeUnknownOption(Schema.Json)({ key: [1, true, null] })
console.log(result._tag) // "Some"
```

**Signature**

```ts
declare const Json: Codec<Json, Json, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14050)

Since v4.0.0

## MutableJson

Schema that accepts any mutable JSON-compatible value. See `Json` for
the immutable variant.

**Signature**

```ts
declare const MutableJson: Codec<MutableJson, MutableJson, never, never>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14093)

Since v4.0.0

## Never

Schema for the `never` type. Always fails validation — no value satisfies it.

**Signature**

```ts
declare const Never: Never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2873)

Since v3.10.0

## Null

Schema for the `null` literal. Validates that the input is strictly `null`.

**See**

- `NullOr` for a union with another schema.

**Signature**

```ts
declare const Null: Null
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2929)

Since v3.10.0

## Number

Schema for `number` values, including `NaN`, `Infinity`, and `-Infinity`.

**Details**

Default JSON serializer:

- Finite numbers are serialized as numbers.
- Non-finite values are serialized as strings (`"NaN"`, `"Infinity"`, `"-Infinity"`).

**See**

- `Finite` for a schema that excludes non-finite values.

**Signature**

```ts
declare const Number: Number
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2986)

Since v4.0.0

## ObjectKeyword

Schema for the `object` type. Validates that the input is a non-null object or function
(i.e. `typeof value === "object" && value !== null || typeof value === "function"`).

**Signature**

```ts
declare const ObjectKeyword: ObjectKeyword
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3094)

Since v4.0.0

## Result

Schema for `Result<A, E>` values.

**Signature**

```ts
declare const Result: <A extends Constraint, E extends Constraint>(success: A, failure: E) => Result<A, E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8786)

Since v4.0.0

## Result (interface)

Type-level representation returned by `Result`.

**Signature**

```ts
export interface Result<A extends Constraint, E extends Constraint> extends declareConstructor<
  Result_.Result<A["Type"], E["Type"]>,
  Result_.Result<A["Encoded"], E["Encoded"]>,
  readonly [A, E],
  ResultIso<A, E>
> {
  readonly Rebuild: Result<A, E>
  readonly success: A
  readonly failure: E
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8752)

Since v4.0.0

## ResultIso (type alias)

Iso representation used for `Result` schemas.

**Details**

Successful results are represented as `{ _tag: "Success", success }`, while
failed results are represented as `{ _tag: "Failure", failure }`.

**Signature**

```ts
type ResultIso<A, E> =
  | { readonly _tag: "Success"; readonly success: A["Iso"] }
  | { readonly _tag: "Failure"; readonly failure: E["Iso"] }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8776)

Since v4.0.0

## String

Schema for `string` values. Validates that the input is `typeof` `"string"`.

**Signature**

```ts
declare const String: String
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2962)

Since v4.0.0

## Symbol

Schema for `symbol` values. Validates that the input is `typeof` `"symbol"`.

**See**

- `UniqueSymbol` for a schema that matches a specific symbol.

**Signature**

```ts
declare const Symbol: Symbol
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3025)

Since v4.0.0

## Undefined

Schema for the `undefined` literal. Validates that the input is strictly `undefined`.

**See**

- `UndefinedOr` for a union with another schema.

**Signature**

```ts
declare const Undefined: Undefined
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2946)

Since v3.10.0

## Unknown

Schema for the `unknown` type. Accepts any value without validation.

**When to use**

Use as a top schema when you need to accept any input while preserving
TypeScript's `unknown` safety at use sites.

**See**

- `Any` for the `any` variant.

**Signature**

```ts
declare const Unknown: Unknown
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2912)

Since v3.10.0

## UnknownFromJsonString

Schema that decodes a JSON-encoded string into an `unknown` value.

**Details**

Decoding:

- A `string` is decoded as an `unknown` value.
- If the string is not valid JSON, decoding fails.

Encoding:

- Any value is encoded as a JSON string using `JSON.stringify`.
- If the value is not a valid JSON value, encoding fails.

**Example** (Decoding unknown JSON strings)

```ts
import { Schema } from "effect"

Schema.decodeUnknownSync(Schema.UnknownFromJsonString)(`{"a":1,"b":2}`)
// => { a: 1, b: 2 }
```

**Signature**

```ts
declare const UnknownFromJsonString: UnknownFromJsonString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L10899)

Since v4.0.0

## Void

Schema for a TypeScript `void` return value.

**When to use**

Use when you need to model the return value of a function, RPC, or endpoint
whose result is intentionally ignored.

**Details**

Runtime parsing accepts any present value and discards it, producing
`undefined`. The public decoded and encoded TypeScript representation remains
`void`, so typed construction, decoding, and encoding APIs are still modeled
as `void`.

**See**

- `Undefined` for a schema that matches only the exact `undefined` value.

**Signature**

```ts
declare const Void: Void
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3077)

Since v3.10.0

# search params

## URLSearchParams

Schema for JavaScript `URLSearchParams` objects.

**Details**

The default JSON serializer encodes a `URLSearchParams` as a query string.

**Signature**

```ts
declare const URLSearchParams: URLSearchParams
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11242)

Since v4.0.0

## URLSearchParams (interface)

Type-level representation of `URLSearchParams`.

**Signature**

```ts
export interface URLSearchParams extends instanceOf<globalThis.URLSearchParams> {
  readonly Rebuild: URLSearchParams
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11228)

Since v4.0.0

## fromURLSearchParams (interface)

Type-level representation returned by `fromURLSearchParams`.

**Signature**

```ts
export interface fromURLSearchParams<S extends Constraint> extends decodeTo<S, URLSearchParams> {
  readonly Rebuild: fromURLSearchParams<S>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11267)

Since v4.0.0

# string

## Char

Schema for strings whose JavaScript `length` is exactly `1`.

**When to use**

Use to validate string values that must have `length === 1`.

**Gotchas**

This schema uses JavaScript `String.length`, so visible characters made from
multiple UTF-16 code units do not satisfy `length === 1`.

**See**

- `String` for unconstrained string values
- `NonEmptyString` for strings with length greater than zero
- `isLengthBetween` for the underlying length check

**Signature**

```ts
declare const Char: Char
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8445)

Since v3.10.0

## Char (interface)

Type-level representation of `Char`.

**Signature**

```ts
export interface Char extends String {
  readonly Rebuild: Char
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8422)

Since v3.10.0

## NonEmptyString

Schema for non-empty strings. Validates that a string has at least one
character.

**Signature**

```ts
declare const NonEmptyString: NonEmptyString
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8414)

Since v3.10.0

## NonEmptyString (interface)

Type-level representation of `NonEmptyString`.

**Signature**

```ts
export interface NonEmptyString extends String {
  readonly Rebuild: NonEmptyString
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L8403)

Since v3.10.0

## StringFromBase64

Decodes a base64 (RFC4648) encoded string into a UTF-8 string.

**Details**

Decoding:

- A **valid** base64 encoded string is decoded as a UTF-8 `string`.

Encoding:

- A `string` is encoded as a base64-encoded string.

**Signature**

```ts
declare const StringFromBase64: StringFromBase64
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11563)

Since v3.10.0

## StringFromBase64 (interface)

Type-level representation of `StringFromBase64`.

**Signature**

```ts
export interface StringFromBase64 extends decodeTo<String, String> {
  readonly Rebuild: StringFromBase64
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11545)

Since v3.10.0

## StringFromBase64Url

Decodes a base64 (URL) encoded string into a UTF-8 string.

**Details**

Decoding:

- A **valid** base64 (URL) encoded string is decoded as a UTF-8 `string`.

Encoding:

- A `string` is encoded as a base64 (URL) encoded string.

**Signature**

```ts
declare const StringFromBase64Url: StringFromBase64Url
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11593)

Since v3.10.0

## StringFromBase64Url (interface)

Type-level representation of `StringFromBase64Url`.

**Signature**

```ts
export interface StringFromBase64Url extends decodeTo<String, String> {
  readonly Rebuild: StringFromBase64Url
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11575)

Since v3.10.0

## StringFromHex

Decodes a hex encoded string into a UTF-8 string.

**Details**

Decoding:

- A **valid** hex encoded string is decoded as a UTF-8 `string`.

Encoding:

- A `string` is encoded as a hex string.

**Signature**

```ts
declare const StringFromHex: StringFromHex
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11623)

Since v3.10.0

## StringFromHex (interface)

Type-level representation of `StringFromHex`.

**Signature**

```ts
export interface StringFromHex extends decodeTo<String, String> {
  readonly Rebuild: StringFromHex
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11605)

Since v3.10.0

## StringFromUriComponent

Decodes a URI component encoded string into a UTF-8 string.
Can be used to store data in a URL.

**Details**

Decoding:

- A **valid** URI component encoded string is decoded as a UTF-8 `string`.

Encoding:

- A `string` is encoded as a URI component encoded string.

**Example** (Decoding URI component strings)

```ts
import { Schema } from "effect"

const PaginationSchema = Schema.Struct({
  maxItemPerPage: Schema.Number,
  page: Schema.Number
})

const UrlSchema = Schema.StringFromUriComponent.pipe(Schema.decodeTo(Schema.fromJsonString(PaginationSchema)))

console.log(Schema.encodeSync(UrlSchema)({ maxItemPerPage: 10, page: 1 }))
// %7B%22maxItemPerPage%22%3A10%2C%22page%22%3A1%7D
```

**Signature**

```ts
declare const StringFromUriComponent: StringFromUriComponent
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11672)

Since v3.12.0

## StringFromUriComponent (interface)

Type-level representation of `StringFromUriComponent`.

**Signature**

```ts
export interface StringFromUriComponent extends decodeTo<String, String> {
  readonly Rebuild: StringFromUriComponent
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11635)

Since v3.12.0

## Trim

Schema that trims whitespace from a string.

**Details**

Decoding:

- A `string` is decoded as a string with no leading or trailing whitespaces.

Encoding:

- The trimmed string is encoded as is.

**Signature**

```ts
declare const Trim: Trim
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11535)

Since v3.10.0

## Trim (interface)

Type-level representation of `Trim`.

**Signature**

```ts
export interface Trim extends decodeTo<Trimmed, String> {
  readonly Rebuild: Trim
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11517)

Since v3.10.0

## Trimmed

Schema for strings that contains no leading or trailing whitespaces.

**Signature**

```ts
declare const Trimmed: Trimmed
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11509)

Since v3.10.0

## Trimmed (interface)

Type-level representation of `Trimmed`.

**Signature**

```ts
export interface Trimmed extends String {
  readonly Rebuild: Trimmed
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L11499)

Since v3.10.0

# transforming

## compose (interface)

Type-level representation returned by `decodeTo` without a custom transformation.

**Signature**

```ts
export interface compose<To extends Constraint, From extends Constraint> extends decodeTo<To, From> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5352)

Since v3.10.0

## decode

Applies a transformation to a schema, creating a new schema with the same type but transformed encoding/decoding.

**When to use**

Use when the decoded type stays the same and the transformation only
normalizes values during encoding and decoding.

**Details**

Call it with a transformation object and then pipe a schema into the returned
function. The resulting schema keeps the same `Type` and `Encoded` types as
the source schema, while applying the transformation during both decoding and
encoding.

Internally this uses `toType(self)` as the target schema and combines service
requirements from the source schema and the transformation.

**Gotchas**

Use `decodeTo` instead when the transformation should change the
decoded type. For this helper, both transformation getters operate on
`S["Type"]` values.

**Example** (Trimming string values during encoding/decoding)

```ts
import { Schema, SchemaGetter } from "effect"

const Trimmed = Schema.String.pipe(
  Schema.decode({
    decode: SchemaGetter.transform((s) => s.trim()),
    encode: SchemaGetter.transform((s) => s.trim())
  })
)

const result = Schema.decodeUnknownSync(Trimmed)("  hello  ")
// result: "hello"
```

**Signature**

```ts
declare const decode: <S extends Constraint, RD = never, RE = never>(transformation: {
  readonly decode: SchemaGetter.Getter<S["Type"], S["Type"], RD>
  readonly encode: SchemaGetter.Getter<S["Type"], S["Type"], RE>
}) => (self: S) => decodeTo<toType<S>, S, RD, RE>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5475)

Since v3.10.0

## decodeTo

Creates a schema that transforms from a source schema to a target schema.

**When to use**

Use when decoding should change the schema's decoded type or encoded shape,
with an optional custom bidirectional transformation.

**Details**

Call it with the target schema `to` and then pipe the source schema `from`
into the returned function. The resulting schema decodes from
`From["Encoded"]` to `To["Type"]` and encodes from `To["Type"]` back to
`From["Encoded"]`.

When no transformation is provided, `SchemaTransformation.passthrough()` is
used, so `From["Type"]` must already be compatible with `To["Encoded"]`.
The resulting schema combines decoding and encoding services from both
schemas and any custom transformation.

**Gotchas**

In a custom transformation, `decode` maps `From["Type"]` to `To["Encoded"]`
and is used on the encoding path, while `encode` maps `To["Encoded"]` to
`From["Type"]` and is used on the decoding path.

**Example** (Transforming strings to numbers with a schema transformation)

```ts
import { Schema, SchemaGetter } from "effect"

const NumberFromString = Schema.String.pipe(
  Schema.decodeTo(Schema.Number, {
    decode: SchemaGetter.transform((s) => Number(s)),
    encode: SchemaGetter.transform((n) => String(n))
  })
)

const result = Schema.decodeUnknownSync(NumberFromString)("123")
// result: 123
```

**Signature**

```ts
declare const decodeTo: {
  <To extends Constraint>(to: To): <From extends Constraint>(from: From) => compose<To, From>
  <To extends Constraint, From extends Constraint, RD = never, RE = never>(
    to: To,
    transformation: {
      readonly decode: SchemaGetter.Getter<NoInfer<To["Encoded"]>, NoInfer<From["Type"]>, RD>
      readonly encode: SchemaGetter.Getter<NoInfer<From["Type"]>, NoInfer<To["Encoded"]>, RE>
    }
  ): (from: From) => decodeTo<To, From, RD, RE>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5410)

Since v4.0.0

## decodeTo (interface)

Type-level representation returned by `decodeTo`.

**Signature**

```ts
export interface decodeTo<To extends Constraint, From extends Constraint, RD = never, RE = never> extends BottomLazy<
  To["ast"],
  decodeTo<To, From, RD, RE>,
  To["~type.parameters"],
  To["~type.mutability"],
  To["~type.optionality"],
  To["~type.constructor.default"],
  From["~encoded.mutability"],
  From["~encoded.optionality"]
> {
  readonly Type: To["Type"]
  readonly Encoded: From["Encoded"]
  readonly DecodingServices: To["DecodingServices"] | From["DecodingServices"] | RD
  readonly EncodingServices: To["EncodingServices"] | From["EncodingServices"] | RE
  readonly "~type.make.in": To["~type.make.in"]
  readonly "~type.make": To["~type.make"]
  readonly Iso: To["Iso"]
  readonly from: From
  readonly to: To
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5323)

Since v4.0.0

## encode

Applies a transformation to a schema's encoded type, creating a new schema where encoding/decoding
operate on `S["Encoded"]` rather than `S["Type"]`.

**Details**

The `decode` getter maps `S["Encoded"]` → `S["Encoded"]` (applied during decoding),
and the `encode` getter maps `S["Encoded"]` → `S["Encoded"]` (applied during encoding).

**Example** (Upper-casing encoded strings)

```ts
import { Schema, SchemaGetter } from "effect"

const UpperFromLower = Schema.String.pipe(
  Schema.encode({
    decode: SchemaGetter.transform((s: string) => s.toLowerCase()),
    encode: SchemaGetter.transform((s: string) => s.toUpperCase())
  })
)
```

**Signature**

```ts
declare const encode: <S extends Constraint, RD = never, RE = never>(transformation: {
  readonly decode: SchemaGetter.Getter<S["Encoded"], S["Encoded"], RD>
  readonly encode: SchemaGetter.Getter<S["Encoded"], S["Encoded"], RE>
}) => (self: S) => decodeTo<S, toEncoded<S>, RD, RE>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5562)

Since v3.10.0

## encodeKeys

Renames struct keys in the encoded form without changing the decoded type.

**Details**

Takes a partial mapping `{ decodedKey: encodedKey }` and produces a
transformation schema that decodes from the renamed keys and encodes back to
the renamed keys. Keys not present in the mapping are left unchanged.
If two existing fields would produce the same encoded key, construction
fails.

**Example** (Renaming `name` to `full_name` in the encoded form)

```ts
import { Schema } from "effect"

const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })
const Encoded = Person.pipe(Schema.encodeKeys({ name: "full_name" }))

// Decodes { full_name: "Alice", age: 30 } → { name: "Alice", age: 30 }
const alice = Schema.decodeUnknownSync(Encoded)({ full_name: "Alice", age: 30 })
console.log(alice)
// { name: 'Alice', age: 30 }
```

**Signature**

```ts
declare const encodeKeys: <
  S extends Constraint & { readonly fields: Struct.Fields },
  const M extends { readonly [K in keyof S["fields"]]?: PropertyKey }
>(
  mapping: M
) => (self: S) => encodeKeys<S, M>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3494)

Since v4.0.0

## encodeKeys (interface)

Type-level representation returned by `encodeKeys`.

**Signature**

```ts
export interface encodeKeys<
  S extends Constraint & { readonly fields: Struct.Fields },
  M extends { readonly [K in keyof S["fields"]]?: PropertyKey }
> extends decodeTo<
  S,
  Struct<{
    [K in keyof S["fields"] as K extends keyof M ? (M[K] extends PropertyKey ? M[K] : K) : K]: toEncoded<S["fields"][K]>
  }>
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3447)

Since v4.0.0

## encodeTo

Reverses a schema transformation so the encoded schema is supplied first.

**When to use**

Use to define a transformation by naming the encoded schema before the
decoded schema.

**Details**

`encodeTo(to)(from)` is equivalent to `to.pipe(decodeTo(from))`. The `from`
schema acts as the target decoded schema and `to` acts as the encoded source.

**Example** (Encoding a number back to a string)

```ts
import { Schema, SchemaGetter } from "effect"

const NumberFromString = Schema.Number.pipe(
  Schema.encodeTo(Schema.String, {
    decode: SchemaGetter.transform((s: string) => Number(s)),
    encode: SchemaGetter.transform((n: number) => String(n))
  })
)
```

**Signature**

```ts
declare const encodeTo: {
  <To extends Constraint>(to: To): <From extends Constraint>(from: From) => decodeTo<From, To>
  <To extends Constraint, From extends Constraint, RD = never, RE = never>(
    to: To,
    transformation: {
      readonly decode: SchemaGetter.Getter<NoInfer<From["Encoded"]>, NoInfer<To["Type"]>, RD>
      readonly encode: SchemaGetter.Getter<NoInfer<To["Type"]>, NoInfer<From["Encoded"]>, RE>
    }
  ): (from: From) => decodeTo<From, To, RD, RE>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L5523)

Since v4.0.0

## extendTo

Adds derived fields to a struct schema during decoding.

**Details**

Each new field is derived from the decoded struct value via a function that
returns `Option`. On encoding the derived fields are stripped. This allows
computed or enriched fields to live in the decoded type without appearing in
the encoded form.

**Example** (Adding a computed `fullName` field)

```ts
import { Option, Schema } from "effect"

const Person = Schema.Struct({ first: Schema.String, last: Schema.String })
const Extended = Person.pipe(
  Schema.extendTo({ fullName: Schema.String }, { fullName: (p) => Option.some(`${p.first} ${p.last}`) })
)

const alice = Schema.decodeUnknownSync(Extended)({ first: "Alice", last: "Smith" })
console.log(alice.fullName)
// Alice Smith
```

**Signature**

```ts
declare const extendTo: <S extends Struct<Struct.Fields>, const Fields extends Struct.Fields>(
  fields: Fields,
  derive: { readonly [K in keyof Fields]: (s: S["Type"]) => Option_.Option<Fields[K]["Type"]> }
) => (self: S) => decodeTo<Struct<Simplify<{ [K in keyof S["fields"]]: toType<S["fields"][K]> } & Fields>>, S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3559)

Since v4.0.0

## flip

Swaps the decoded and encoded sides of a schema.

**When to use**

Use to invert a schema transformation direction.

**Details**

Calling `flip` twice returns the original schema.

**Example** (Flipping a number-from-string schema)

```ts
import { Schema } from "effect"

// NumberFromString: decodes string → number
const flipped = Schema.flip(Schema.NumberFromString)
// flipped: decodes number → string
```

**Signature**

```ts
declare const flip: <S extends Top>(schema: S) => S extends flip<infer F> ? F["Rebuild"] : flip<S>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2563)

Since v4.0.0

## flip (interface)

Type-level representation returned by `flip`.

**Signature**

```ts
export interface flip<S extends Top> extends BottomLazy<
  SchemaAST.AST,
  flip<S>,
  ReadonlyArray<Constraint>,
  S["~encoded.mutability"],
  S["~encoded.optionality"],
  ConstructorDefault,
  S["~type.mutability"],
  S["~type.optionality"]
> {
  readonly Type: S["Encoded"]
  readonly Encoded: S["Type"]
  readonly DecodingServices: S["EncodingServices"]
  readonly EncodingServices: S["DecodingServices"]
  readonly "~type.make.in": S["Encoded"]
  readonly "~type.make": S["Encoded"]
  readonly Iso: S["Encoded"]
  readonly [FlipTypeId]: typeof FlipTypeId
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2511)

Since v4.0.0

## link

Constructs an `SchemaAST.Link` that describes how a value of type `T` encodes to and decodes from a `To` schema.
Used when building low-level AST transformations that bridge two schema types.

**Signature**

```ts
declare const link: <T>() => <To extends Constraint>(
  encodeTo: To,
  transformation: {
    readonly decode: SchemaGetter.Getter<T, NoInfer<To["Type"]>>
    readonly encode: SchemaGetter.Getter<NoInfer<To["Type"]>, T>
  }
) => SchemaAST.Link
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L6313)

Since v4.0.0

## mutable

Makes an array or tuple schema mutable, removing the `readonly` modifier.

**Example** (Defining mutable arrays)

```ts
import { Schema } from "effect"

const schema = Schema.mutable(Schema.Array(Schema.Number))

// number[]   (mutable)
type T = typeof schema.Type
```

**Signature**

```ts
declare const mutable: mutableLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4655)

Since v3.10.0

## mutable (interface)

Type-level representation returned by `mutable`.

**Signature**

```ts
export interface mutable<S extends Constraint & { readonly ast: SchemaAST.Arrays }> extends BottomLazy<
  S["ast"],
  mutable<S>,
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: Mutable<S["Type"]>
  readonly Encoded: Mutable<S["Encoded"]>
  readonly DecodingServices: S["DecodingServices"]
  readonly EncodingServices: S["EncodingServices"]
  // "~type.make" and "~type.make.in" as they are because they are contravariant
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4608)

Since v3.10.0

## toEncoded

Extracts the encoded-side schema: sets `Type` to equal the `Encoded`,
discarding the decoding transformation path.

**Signature**

```ts
declare const toEncoded: toEncodedLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2501)

Since v4.0.0

## toEncoded (interface)

Type-level representation returned by `toEncoded`.

**Signature**

```ts
export interface toEncoded<S extends Constraint> extends BottomLazy<
  SchemaAST.AST,
  toEncoded<S>,
  ReadonlyArray<Constraint>,
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Encoded"]
  readonly Encoded: S["Encoded"]
  readonly DecodingServices: never
  readonly EncodingServices: never
  readonly "~type.make.in": S["Encoded"]
  readonly "~type.make": S["Encoded"]
  readonly Iso: S["Encoded"]
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2467)

Since v4.0.0

## toType

Extracts the type-side schema: sets `Encoded` to equal the decoded `Type`,
discarding the encoding transformation path.

**Signature**

```ts
declare const toType: toTypeLambda
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2459)

Since v4.0.0

## toType (interface)

Type-level representation returned by `toType`.

**Signature**

```ts
export interface toType<S extends Constraint> extends BottomLazy<
  S["ast"],
  toType<S>,
  S["~type.parameters"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
> {
  readonly Type: S["Type"]
  readonly Encoded: S["Type"]
  readonly DecodingServices: never
  readonly EncodingServices: never
  readonly "~type.make.in": S["~type.make.in"]
  readonly "~type.make": S["~type.make"]
  readonly Iso: S["Iso"]
  readonly schema: S
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2425)

Since v4.0.0

# utility types

## BottomLazy (interface)

Lazy `Bottom` variant for schema implementations that compute their public
views on demand.

**When to use**

Use as an implementation base for schema interfaces that must expose
`Bottom` behavior without forcing TypeScript to eagerly evaluate expensive
`Type`, `Encoded`, or service views.

**Details**

The laziness is purely type-level; runtime behavior is unchanged.
`BottomLazy` keeps the structural operations inherited from `Bottom`, but
erases the expensive schema views to `unknown`. Concrete schema interfaces can
then redeclare the precise views they expose. This keeps wide schemas such as
`Struct` and `Union` cheaper when generic code reads a single view, while
preserving their exact public types.

**See**

- `Bottom` for the fully parameterized schema interface when every
  view must be supplied directly.

**Signature**

```ts
export interface BottomLazy<
  out Ast extends SchemaAST.AST,
  out Rebuild extends Top,
  in out TypeParameters extends ReadonlyArray<Constraint> = readonly [],
  out TypeMutability extends Mutability = "readonly",
  out TypeOptionality extends Optionality = "required",
  out TypeConstructorDefault extends ConstructorDefault = "no-default",
  out EncodedMutability extends Mutability = "readonly",
  out EncodedOptionality extends Optionality = "required"
> extends Bottom<
  unknown,
  unknown,
  unknown,
  unknown,
  Ast,
  Rebuild,
  unknown,
  unknown,
  TypeParameters,
  unknown,
  TypeMutability,
  TypeOptionality,
  TypeConstructorDefault,
  EncodedMutability,
  EncodedOptionality
> {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L270)

Since v4.0.0

## revealBottom

Returns a schema widened to the fully-parameterized `Bottom` interface,
making all 14 type parameters visible to TypeScript.

**Details**

Normally, concrete schema interfaces (e.g. `Schema<string>`) hide most type
parameters. `revealBottom` is useful when writing generic utilities that need
to inspect or propagate the complete set of type parameters.

**Example** (Inspecting all type parameters of a schema)

```ts
import { Schema } from "effect"

const schema = Schema.String

// Widen to Bottom to access all 14 type parameters
const bottom = Schema.revealBottom(schema)

// `bottom` now exposes Type, Encoded, DecodingServices, EncodingServices,
// ast, Rebuild, ~type.make.in, Iso, ~type.parameters, etc.
type T = (typeof bottom)["Type"] // string
type E = (typeof bottom)["Encoded"] // string
```

**Signature**

```ts
declare const revealBottom: <S extends Top>(
  bottom: S
) => Bottom<
  S["Type"],
  S["Encoded"],
  S["DecodingServices"],
  S["EncodingServices"],
  S["ast"],
  S["Rebuild"],
  S["~type.make.in"],
  S["Iso"],
  S["~type.parameters"],
  S["~type.make"],
  S["~type.mutability"],
  S["~type.optionality"],
  S["~type.constructor.default"],
  S["~encoded.mutability"],
  S["~encoded.optionality"]
>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L481)

Since v4.0.0

## revealCodec

Returns a codec widened to the full `Codec` interface, prompting
TypeScript to infer all four type parameters (`T`, `E`, `RD`, `RE`).

**Details**

When a schema is stored in a variable typed as `Schema<T>` or `Top`, the
encoded type and service requirements are erased. Passing the value through
`revealCodec` recovers those parameters without any runtime cost.

**Example** (Recovering encoded type from a schema variable)

```ts
import { Schema } from "effect"

const schema: Schema.Schema<number> = Schema.NumberFromString

// Without revealCodec, Encoded is unknown
const codec = Schema.revealCodec(schema)
type Enc = (typeof codec)["Encoded"] // string
```

**Signature**

```ts
declare const revealCodec: <T, E, RD, RE>(codec: Codec<T, E, RD, RE>) => Codec<T, E, RD, RE>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L975)

Since v4.0.0

# utils

## Annotations (namespace)

The `Annotations` namespace groups all annotation interfaces used to attach
metadata to schemas. Annotations control documentation, validation messages,
JSON Schema generation, equivalence, arbitrary generation, and more.

**Details**

Use `resolveAnnotations` to read the annotations attached to a schema at
runtime.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14138)

Since v4.0.0

### Annotations (interface)

This interface is used to define the annotations that can be attached to a
schema. You can extend this interface to define your own annotations.

**Details**

Note that both a missing key or `undefined` is used to indicate that the
annotation is not present.

This means that can remove any annotation by setting it to `undefined`.

**Example** (Defining your own annotations)

```ts
import { Schema } from "effect"

// Extend the Annotations interface with a custom `version` annotation
declare module "effect/Schema" {
  namespace Annotations {
    interface Annotations {
      readonly version?: readonly [major: number, minor: number, patch: number] | undefined
    }
  }
}

// The `version` annotation is now recognized by the TypeScript compiler
const schema = Schema.String.annotate({ version: [1, 2, 0] })

// const version: readonly [major: number, minor: number, patch: number] | undefined
const version = Schema.resolveAnnotations(schema)?.["version"]

if (version) {
  // Access individual parts of the version
  console.log(version[1])
  // Output: 2
}
```

**Signature**

```ts
export interface Annotations {
  readonly [x: string]: unknown
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14182)

Since v4.0.0

### Augment (interface)

Annotations shared by all schema nodes. These map to common JSON Schema /
OpenAPI fields: `title`, `description`, `format`, etc.

**Signature**

```ts
export interface Augment extends Annotations {
  /**
   * Human-readable description of what a value is expected to satisfy.
   *
   * **Details**
   *
   * For filter and refinement failures, the default formatter uses
   * `message` first, then `expected`, and finally falls back to `<filter>`.
   *
   * Use this to name a failed filter in the default message:
   * `Expected <expected>, got <actual>`.
   */
  readonly expected?: string | undefined
  readonly title?: string | undefined
  readonly description?: string | undefined
  readonly documentation?: string | undefined
  readonly readOnly?: boolean | undefined
  readonly writeOnly?: boolean | undefined
  readonly format?: string | undefined
  readonly contentEncoding?: string | undefined
  readonly contentMediaType?: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14193)

Since v4.0.0

### Documentation (interface)

Extends `Augment` with type-parametric `default` and `examples` fields.

**Signature**

```ts
export interface Documentation<T> extends Augment {
  readonly default?: T | undefined
  readonly examples?: ReadonlyArray<T> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14222)

Since v4.0.0

### Key (interface)

Annotations for struct property schemas. Extends `Documentation`
with an optional `messageMissingKey` to override the error message when
the property key is absent during decoding.

**Signature**

```ts
export interface Key<T> extends Documentation<T> {
  /**
   * The message to use when a key is missing.
   */
  readonly messageMissingKey?: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14235)

Since v4.0.0

### Bottom (interface)

Base annotations shared by all composite schema nodes. Extends
`Documentation` with error messages, branding, parse options, and
arbitrary generation hooks. `Declaration` and other annotation
interfaces build on top of this.

**Signature**

```ts
export interface Bottom<T, TypeParameters extends ReadonlyArray<Constraint>> extends Documentation<T> {
  /**
   * Complete message to use when this schema node reports an issue.
   *
   * **Details**
   *
   * This replaces the default message for matching issue types instead of
   * only changing the expected label. For a filter or refinement failure,
   * annotate the filter with `message` to replace the whole filter failure
   * message, or `expected` to keep the default
   * `Expected <expected>, got <actual>` shape.
   */
  readonly message?: string | undefined
  /**
   * The message to use when a key is unexpected.
   */
  readonly messageUnexpectedKey?: string | undefined
  /**
   * Stable identifier for this schema node.
   *
   * **Details**
   *
   * Identifiers are used by schema tooling, including JSON Schema
   * generation, to name references. The default formatter also uses
   * `identifier` as the expected label for type-level failures, such as
   * `Expected UserId, got null`.
   *
   * `identifier` does not name a failed filter or refinement. If the base
   * type matches and a filter fails, put `expected` or `message` on the
   * filter/refinement instead.
   */
  readonly identifier?: string | undefined
  readonly parseOptions?: SchemaAST.ParseOptions | undefined
  /**
   * Optional metadata used to identify or extend the filter with custom data.
   */
  readonly meta?: Meta | undefined
  /**
   * Accumulated brands when multiple brands are added with `Schema.brand`.
   */
  readonly brands?: ReadonlyArray<string> | undefined
  readonly toArbitrary?: ToArbitrary.Declaration<T, TypeParameters> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14251)

Since v4.0.0

### Declaration (interface)

Full annotation set for `Declaration` schema nodes — used when defining
custom, opaque schema types via `Schema.declare`. Extends `Bottom`
with optional codec, arbitrary, equivalence, and formatter hooks so that
derived capabilities (JSON encoding, property testing, etc.) can be
provided for the custom type.

**Signature**

```ts
export interface Declaration<T, TypeParameters extends ReadonlyArray<Constraint> = readonly []> extends Bottom<
  T,
  TypeParameters
> {
  readonly toCodec?: ((typeParameters: TypeParameters.Encoded<TypeParameters>) => SchemaAST.Link) | undefined
  readonly toCodecJson?: ((typeParameters: TypeParameters.Encoded<TypeParameters>) => SchemaAST.Link) | undefined
  readonly toCodecIso?: ((typeParameters: TypeParameters.Type<TypeParameters>) => SchemaAST.Link) | undefined
  readonly toArbitrary?: ToArbitrary.Declaration<T, TypeParameters> | undefined
  readonly toEquivalence?: ToEquivalence.Declaration<T, TypeParameters> | undefined
  readonly toFormatter?: ToFormatter.Declaration<T, TypeParameters> | undefined
  readonly typeConstructor?:
    | {
        readonly _tag: string
        readonly [key: string]: unknown
      }
    | undefined
  readonly generation?:
    | {
        readonly runtime: string
        readonly Type: string
        readonly Encoded?: string | undefined
        readonly importDeclaration?: string | undefined
      }
    | undefined
  /**
   * Used to collect sentinels from a Declaration SchemaAST.
   *
   * @internal
   */
  readonly "~sentinels"?: ReadonlyArray<SchemaAST.Sentinel> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14335)

Since v4.0.0

### Filter (interface)

Annotations for filter schema nodes (created via `Schema.filter`). Extends
`Augment` with an optional error message, identifier, and metadata.
Filters are intentionally non-parametric to keep them covariant.

**Signature**

```ts
export interface Filter extends Augment {
  /**
   * Complete message to use when this filter or refinement fails.
   *
   * **Details**
   *
   * The default formatter checks filter annotations in this order:
   * `message`, then `expected`, then `<filter>`.
   */
  readonly message?: string | undefined
  /**
   * Stable identifier for the schema after this filter is attached.
   *
   * **Details**
   *
   * This can affect schema tooling such as JSON Schema generation and
   * type-level failures before the filter runs, but it does not name the
   * failed filter itself. For filter failure messages, use `expected` or
   * `message`.
   */
  readonly identifier?: string | undefined
  /**
   * Optional metadata used to identify or extend the filter with custom data.
   */
  readonly meta?: Meta | undefined
  /**
   * Optional hints used by arbitrary derivation for this filter.
   *
   * **Details**
   *
   * The same annotation can be attached to a single filter or a
   * `FilterGroup`. Group hints apply to the same schema node while child
   * filters are still collected and checked normally.
   */
  readonly arbitrary?: ToArbitrary.Filter | undefined
  /**
   * Marks the filter as *structural*, meaning it applies to the shape or
   * structure of the container (e.g., array length, object keys) rather than
   * the contents.
   *
   * **Details**
   *
   * Example: `minLength` on an array is a structural filter.
   */
  readonly "~structural"?: boolean | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14376)

Since v4.0.0

### Issue (interface)

Annotations that can be attached to schema issues.

**Details**

The optional `message` field overrides the default issue message.

**Signature**

```ts
export interface Issue extends Annotations {
  readonly message?: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14745)

Since v4.0.0

### BuiltInMetaDefinitions (interface)

Registry of metadata payloads emitted by built-in schema filters and checks.

**Details**

Do not augment this interface with custom metadata; extend `MetaDefinitions`
instead.

**Signature**

```ts
export interface BuiltInMetaDefinitions {
  // String Meta
  readonly isStringFinite: {
    readonly _tag: "isStringFinite"
    readonly regExp: globalThis.RegExp
  }
  readonly isStringBigInt: {
    readonly _tag: "isStringBigInt"
    readonly regExp: globalThis.RegExp
  }
  readonly isStringSymbol: {
    readonly _tag: "isStringSymbol"
    readonly regExp: globalThis.RegExp
  }
  readonly isMinLength: {
    readonly _tag: "isMinLength"
    readonly minLength: number
  }
  readonly isMaxLength: {
    readonly _tag: "isMaxLength"
    readonly maxLength: number
  }
  readonly isLengthBetween: {
    readonly _tag: "isLengthBetween"
    readonly minimum: number
    readonly maximum: number
  }
  readonly isPattern: {
    readonly _tag: "isPattern"
    readonly regExp: globalThis.RegExp
  }
  readonly isTrimmed: {
    readonly _tag: "isTrimmed"
    readonly regExp: globalThis.RegExp
  }
  readonly isUUID: {
    readonly _tag: "isUUID"
    readonly regExp: globalThis.RegExp
    readonly version: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | undefined
  }
  readonly isGUID: {
    readonly _tag: "isGUID"
    readonly regExp: globalThis.RegExp
  }
  readonly isULID: {
    readonly _tag: "isULID"
    readonly regExp: globalThis.RegExp
  }
  readonly isBase64: {
    readonly _tag: "isBase64"
    readonly regExp: globalThis.RegExp
  }
  readonly isBase64Url: {
    readonly _tag: "isBase64Url"
    readonly regExp: globalThis.RegExp
  }
  readonly isStartsWith: {
    readonly _tag: "isStartsWith"
    readonly startsWith: string
    readonly regExp: globalThis.RegExp
  }
  readonly isEndsWith: {
    readonly _tag: "isEndsWith"
    readonly endsWith: string
    readonly regExp: globalThis.RegExp
  }
  readonly isIncludes: {
    readonly _tag: "isIncludes"
    readonly includes: string
    readonly regExp: globalThis.RegExp
  }
  readonly isUppercased: {
    readonly _tag: "isUppercased"
    readonly regExp: globalThis.RegExp
  }
  readonly isLowercased: {
    readonly _tag: "isLowercased"
    readonly regExp: globalThis.RegExp
  }
  readonly isCapitalized: {
    readonly _tag: "isCapitalized"
    readonly regExp: globalThis.RegExp
  }
  readonly isUncapitalized: {
    readonly _tag: "isUncapitalized"
    readonly regExp: globalThis.RegExp
  }
  // Number Meta
  readonly isFinite: {
    readonly _tag: "isFinite"
  }
  readonly isInt: {
    readonly _tag: "isInt"
  }
  readonly isMultipleOf: {
    readonly _tag: "isMultipleOf"
    readonly divisor: number
  }
  readonly isGreaterThan: {
    readonly _tag: "isGreaterThan"
    readonly exclusiveMinimum: number
  }
  readonly isGreaterThanOrEqualTo: {
    readonly _tag: "isGreaterThanOrEqualTo"
    readonly minimum: number
  }
  readonly isLessThan: {
    readonly _tag: "isLessThan"
    readonly exclusiveMaximum: number
  }
  readonly isLessThanOrEqualTo: {
    readonly _tag: "isLessThanOrEqualTo"
    readonly maximum: number
  }
  readonly isBetween: {
    readonly _tag: "isBetween"
    readonly minimum: number
    readonly maximum: number
    readonly exclusiveMinimum?: boolean | undefined
    readonly exclusiveMaximum?: boolean | undefined
  }
  // BigInt Meta
  readonly isGreaterThanBigInt: {
    readonly _tag: "isGreaterThanBigInt"
    readonly exclusiveMinimum: bigint
  }
  readonly isGreaterThanOrEqualToBigInt: {
    readonly _tag: "isGreaterThanOrEqualToBigInt"
    readonly minimum: bigint
  }
  readonly isLessThanBigInt: {
    readonly _tag: "isLessThanBigInt"
    readonly exclusiveMaximum: bigint
  }
  readonly isLessThanOrEqualToBigInt: {
    readonly _tag: "isLessThanOrEqualToBigInt"
    readonly maximum: bigint
  }
  readonly isBetweenBigInt: {
    readonly _tag: "isBetweenBigInt"
    readonly minimum: bigint
    readonly maximum: bigint
    readonly exclusiveMinimum?: boolean | undefined
    readonly exclusiveMaximum?: boolean | undefined
  }
  // Date Meta
  readonly isDateValid: {
    readonly _tag: "isDateValid"
  }
  readonly isGreaterThanDate: {
    readonly _tag: "isGreaterThanDate"
    readonly exclusiveMinimum: globalThis.Date
  }
  readonly isGreaterThanOrEqualToDate: {
    readonly _tag: "isGreaterThanOrEqualToDate"
    readonly minimum: globalThis.Date
  }
  readonly isLessThanDate: {
    readonly _tag: "isLessThanDate"
    readonly exclusiveMaximum: globalThis.Date
  }
  readonly isLessThanOrEqualToDate: {
    readonly _tag: "isLessThanOrEqualToDate"
    readonly maximum: globalThis.Date
  }
  readonly isBetweenDate: {
    readonly _tag: "isBetweenDate"
    readonly minimum: globalThis.Date
    readonly maximum: globalThis.Date
    readonly exclusiveMinimum?: boolean | undefined
    readonly exclusiveMaximum?: boolean | undefined
  }
  // Objects Meta
  readonly isMinProperties: {
    readonly _tag: "isMinProperties"
    readonly minProperties: number
  }
  readonly isMaxProperties: {
    readonly _tag: "isMaxProperties"
    readonly maxProperties: number
  }
  readonly isPropertiesLengthBetween: {
    readonly _tag: "isPropertiesLengthBetween"
    readonly minimum: number
    readonly maximum: number
  }
  readonly isPropertyNames: {
    readonly _tag: "isPropertyNames"
    readonly propertyNames: SchemaAST.AST
  }
  // Arrays Meta
  readonly isUnique: {
    readonly _tag: "isUnique"
  }
  // Declaration Meta
  readonly isMinSize: {
    readonly _tag: "isMinSize"
    readonly minSize: number
  }
  readonly isMaxSize: {
    readonly _tag: "isMaxSize"
    readonly maxSize: number
  }
  readonly isSizeBetween: {
    readonly _tag: "isSizeBetween"
    readonly minimum: number
    readonly maximum: number
  }
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14760)

Since v4.0.0

### MetaDefinitions (interface)

Augmentable registry of schema filter metadata payloads.

**Details**

Extend this interface to add custom values accepted by annotation `meta`
fields.

**Signature**

```ts
export interface MetaDefinitions extends BuiltInMetaDefinitions {}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14989)

Since v4.0.0

### BuiltInMeta (type alias)

Union of all metadata payloads defined by `BuiltInMetaDefinitions`.

**Signature**

```ts
type BuiltInMeta = BuiltInMetaDefinitions[keyof BuiltInMetaDefinitions]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14976)

Since v4.0.0

### Meta (type alias)

Union of built-in and user-augmented schema filter metadata payloads.

**Signature**

```ts
type Meta = MetaDefinitions[keyof MetaDefinitions]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14997)

Since v4.0.0

### TypeParameters (namespace)

Helpers for projecting declaration type-parameter schemas into decoded or
encoded codec arrays used by annotation hooks.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14303)

Since v4.0.0

#### Type (type alias)

Maps declaration type-parameter schemas to codecs for their decoded `Type`
values.

**Signature**

```ts
type Type<TypeParameters> = {
  readonly [K in keyof TypeParameters]: Codec<TypeParameters[K]["Type"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14311)

Since v4.0.0

#### Encoded (type alias)

Maps declaration type-parameter schemas to codecs for their `Encoded` values.

**Signature**

```ts
type Encoded<TypeParameters> = {
  readonly [K in keyof TypeParameters]: Codec<TypeParameters[K]["Encoded"]>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14320)

Since v4.0.0

### ToArbitrary (namespace)

Types used by arbitrary-derivation annotations to configure `toArbitrary`
hooks, filter hints, candidate sources, diagnostics, and merged generation
constraints.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14432)

Since v4.0.0

#### Filter (interface)

Arbitrary-generation hints attached to a filter or filter group.

**Details**

`constraint` refines the schema node's base generator. `candidate` adds a
weighted source before all filters run. If neither hint is provided, the
filter does not guide generation; generated values are still checked by
the filter predicate. With `{ report: true }`, this is reported as
`OpaqueFilter`.

**Signature**

```ts
export interface Filter {
  readonly constraint?: GenerationConstraint | undefined
  readonly candidate?: Candidate | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14447)

Since v4.0.0

#### Candidate (interface)

Additional arbitrary source used before final filter checks run.

**Details**

The base generator keeps weight `1`; candidates default to weight `1`
and must use a positive integer weight. `make` receives the merged
constraint for the current node and may return `undefined` to opt out,
including for recursive terminal branches. Candidate values are still
checked by every schema filter, so invalid candidates affect efficiency but
not validity.

**Signature**

```ts
export interface Candidate {
  readonly weight?: number | undefined
  readonly make: (fc: typeof FastCheck, context: Context) => FastCheck.Arbitrary<unknown> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14467)

Since v4.0.0

#### OrderedConstraint (interface)

Ordered constraint accumulated from range checks.

**Details**

Generators consume these constraints only when they recognize `order`,
such as `Order.Number`, `Order.BigInt`, DateTime, or BigDecimal. Merging
constraints with different `Order` instances fails fast.

**Signature**

```ts
export interface OrderedConstraint<T> {
  readonly order: Order.Order<T>
  readonly minimum?: T | undefined
  readonly exclusiveMinimum?: boolean | undefined
  readonly maximum?: T | undefined
  readonly exclusiveMaximum?: boolean | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14487)

Since v4.0.0

#### GenerationConstraint (interface)

Node-local arbitrary-generation constraint accumulated from schema checks.

**Details**

`GenerationConstraint` is a generation hint for the current schema AST
node, not a self-describing validation contract. Each generator consumes
the fields it understands for the current node and ignores the rest;
final schema filters still validate every generated value.

`minLength` and `maxLength` represent node-local cardinality: string
length for strings, array length for arrays, final own-property count for
objects, and final size/cardinality for sets, maps, hash collections, and
chunks. `patterns` are concatenated and used by string generators.
`integer`, `noNaN`, `noInfinity`, `valid`, and `unique` are true when any
contributing filter sets them. Range bounds live in `ordered` so ordered
values can share the same representation.

**Signature**

```ts
export interface GenerationConstraint {
  readonly minLength?: number | undefined
  readonly maxLength?: number | undefined
  readonly patterns?: readonly [string, ...Array<string>]
  readonly integer?: boolean | undefined
  readonly noInfinity?: boolean | undefined
  readonly noNaN?: boolean | undefined
  readonly valid?: boolean | undefined
  readonly unique?: boolean | undefined
  readonly ordered?: OrderedConstraint<any> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14516)

Since v4.0.0

#### Recursion (interface)

Recursion budget passed to arbitrary-derivation hooks.

**Details**

Pass this object to `fc.oneof` when combining terminal and recursive
branches. Put the terminal branch first because fast-check uses only the
first branch once `maxDepth` is reached for `depthIdentifier`.

**Signature**

```ts
export interface Recursion {
  readonly maxDepth: number
  readonly depthIdentifier: FastCheck.DepthIdentifier | string
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14540)

Since v4.0.0

#### Context (interface)

Context passed to arbitrary-derivation hooks and candidate factories.

**Details**

`constraint` contains the merged constraint for the current schema
node. `recursion` is present while deriving through a suspended schema;
hooks that build recursive alternatives should pass it to `fc.oneof` with
the finite branch first.

**Signature**

```ts
export interface Context {
  readonly constraint?: ToArbitrary.GenerationConstraint | undefined
  readonly recursion?: ToArbitrary.Recursion | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14558)

Since v4.0.0

#### TypeParameter (interface)

Arbitrary generators derived for a declaration type parameter.

**Details**

`arbitrary` is the normal generator. `terminal` is the finite generator
used while building recursive terminal branches and is `undefined` when
no finite path is known. Optional containers can ignore it; non-empty
containers need it for their terminal branch.

**Signature**

```ts
export interface TypeParameter<T> {
  readonly arbitrary: FastCheck.Arbitrary<T>
  readonly terminal: FastCheck.Arbitrary<T> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14576)

Since v4.0.0

#### Derivation (interface)

Arbitrary derivation returned by declaration hooks.

**Details**

`arbitrary` is the normal generator. `terminal` is an optional finite
branch for recursive schemas. If omitted, it defaults to `arbitrary` only
for declarations without type parameters.

**Signature**

```ts
export interface Derivation<T> {
  readonly arbitrary: FastCheck.Arbitrary<T>
  readonly terminal?: FastCheck.Arbitrary<T> | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14593)

Since v4.0.0

#### Declaration (interface)

Hook signature for declaration schema arbitrary annotations.

**Details**

Type parameters expose normal and terminal generators. A declaration with
no type parameters can return a bare arbitrary; a generic declaration
must return `terminal` explicitly when it has a finite branch depending on
parameters.

**Signature**

```ts
export interface Declaration<T, TypeParameters extends ReadonlyArray<Constraint>> {
  (
    /* Arbitrary derivations for any type parameters of the schema (if present) */
    typeParameters: { readonly [K in keyof TypeParameters]: TypeParameter<TypeParameters[K]["Type"]> }
  ): (fc: typeof FastCheck, context: Context) => Output<T>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14625)

Since v4.0.0

#### WithReport (interface)

Wraps a derived value together with arbitrary-derivation diagnostics.

**Signature**

```ts
export interface WithReport<A> {
  readonly value: A
  readonly report: Report
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14638)

Since v4.0.0

#### Report (interface)

Diagnostics collected while deriving an arbitrary.

**Details**

Reports contain warnings only. Unsupported schema nodes, impossible
constraints, invalid candidate weights, and throwing candidate factories
fail immediately.

**Signature**

```ts
export interface Report {
  readonly warnings: ReadonlyArray<Warning>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14655)

Since v4.0.0

#### OpaqueFilterWarning (interface)

Warning emitted when a filter is handled only by the final `.filter`.

**Details**

The filter is still enforced. The warning means it did not contribute
a constraint or candidate, so generation may rely on fast-check discards.

**Signature**

```ts
export interface OpaqueFilterWarning {
  readonly _tag: "OpaqueFilter"
  readonly path: ReadonlyArray<PropertyKey>
  readonly description?: string | undefined
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14678)

Since v4.0.0

#### Output (type alias)

Output accepted from declaration arbitrary hooks.

**Details**

A bare fast-check arbitrary is shorthand for `{ arbitrary }`, useful for
atomic declarations such as URLs. Generic declarations that need precise
recursive behavior should return a `Derivation` with `terminal`.

**Signature**

```ts
type Output<T> = FastCheck.Arbitrary<T> | Derivation<T>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14610)

Since v4.0.0

#### Warning (type alias)

Non-fatal arbitrary-derivation warning.

**Signature**

```ts
type Warning = OpaqueFilterWarning
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14665)

Since v4.0.0

### ToFormatter (namespace)

Types used by formatter annotations to customize formatter derivation for
declaration schemas.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14691)

Since v4.0.0

#### Declaration (interface)

Hook signature for declaration schema formatter annotations.

**Details**

Given formatters for any type parameters, returns a formatter for `T`.

**Signature**

```ts
export interface Declaration<T, TypeParameters extends ReadonlyArray<Constraint>> {
  (
    /* Formatters for any type parameters of the schema (if present) */
    typeParameters: { readonly [K in keyof TypeParameters]: Formatter<TypeParameters[K]["Type"]> }
  ): Formatter<T>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14702)

Since v4.0.0

### ToEquivalence (namespace)

Types used by equivalence annotations to customize equivalence derivation for
declaration schemas.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14716)

Since v4.0.0

#### Declaration (interface)

Hook signature for declaration schema equivalence annotations.

**Details**

Given equivalences for any type parameters, returns an `Equivalence` for `T`.

**Signature**

```ts
export interface Declaration<T, TypeParameters extends ReadonlyArray<Constraint>> {
  (
    /* Equivalences for any type parameters of the schema (if present) */
    typeParameters: { readonly [K in keyof TypeParameters]: Equivalence.Equivalence<TypeParameters[K]["Type"]> }
  ): Equivalence.Equivalence<T>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L14727)

Since v4.0.0

## Codec (namespace)

Namespace of type-level helpers for `Codec`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L829)

Since v4.0.0

### Encoded (type alias)

Extracts the encoded (`Encoded`) type from a schema.

**Example** (Extracting the encoded type)

```ts
import { Schema } from "effect"

const schema = Schema.NumberFromString
type Enc = Schema.Codec.Encoded<typeof schema>
// string
```

**Signature**

```ts
type Encoded<S> = S extends { readonly Encoded: infer E } ? E : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L846)

Since v3.10.0

### DecodingServices (type alias)

Extracts the Effect services required during _decoding_ from a schema.

**Example** (Checking decoding service requirements)

```ts
import { Schema } from "effect"

const schema = Schema.String
type RD = Schema.Codec.DecodingServices<typeof schema>
// never
```

**Signature**

```ts
type DecodingServices<S> = S extends { readonly DecodingServices: infer R } ? R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L864)

Since v4.0.0

### EncodingServices (type alias)

Extracts the Effect services required during _encoding_ from a schema.

**Example** (Checking encoding service requirements)

```ts
import { Schema } from "effect"

const schema = Schema.String
type RE = Schema.Codec.EncodingServices<typeof schema>
// never
```

**Signature**

```ts
type EncodingServices<S> = S extends { readonly EncodingServices: infer R } ? R : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L882)

Since v4.0.0

## Record (namespace)

Namespace for `Record` type utilities.

**Details**

- `Record.Key` — constraint for the key schema (must encode to `PropertyKey`)
- `Record.Type<K, V>` — decoded type of the record
- `Record.Encoded<K, V>` — encoded type of the record

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3607)

Since v3.10.0

### Key (interface)

Constraint for schemas that can be used as record keys.

**Details**

The key schema must decode and encode property keys (`string`, `number`, or
`symbol`) so it can describe object property names.

**Signature**

```ts
export interface Key extends Codec<PropertyKey, PropertyKey, unknown, unknown> {
  readonly "~type.make": PropertyKey
  readonly Iso: PropertyKey
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3619)

Since v4.0.0

### Type (type alias)

Computes the decoded object type for a record schema from its key and value
schemas.

**Details**

The key schema supplies the property keys and the value schema supplies each
property's decoded `Type`. Optional and mutable value schemas affect the
resulting property optionality and writability.

**Signature**

```ts
type Type<Key, Value> = Value extends { readonly "~type.optionality": "optional" }
  ? Value extends { readonly "~type.mutability": "mutable" }
    ? { [P in Key["Type"]]?: Value["Type"] }
    : { readonly [P in Key["Type"]]?: Value["Type"] }
  : Value extends { readonly "~type.mutability": "mutable" }
    ? { [P in Key["Type"]]: Value["Type"] }
    : { readonly [P in Key["Type"]]: Value["Type"] }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3637)

Since v3.10.0

### Iso (type alias)

Computes the iso object type for a record schema from the key schema's `Iso`
keys and the value schema's `Iso` values.

**Signature**

```ts
type Iso<Key, Value> = Value extends { readonly "~type.optionality": "optional" }
  ? Value extends { readonly "~type.mutability": "mutable" }
    ? { [P in Key["Iso"]]?: Value["Iso"] }
    : { readonly [P in Key["Iso"]]?: Value["Iso"] }
  : Value extends { readonly "~type.mutability": "mutable" }
    ? { [P in Key["Iso"]]: Value["Iso"] }
    : { readonly [P in Key["Iso"]]: Value["Iso"] }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3651)

Since v4.0.0

### Encoded (type alias)

Computes the encoded object type for a record schema from the key and value
schemas' encoded types.

**Details**

Encoded-side optionality and mutability on the value schema determine whether
the encoded record properties are optional or writable.

**Signature**

```ts
type Encoded<Key, Value> = Value extends { readonly "~encoded.optionality": "optional" }
  ? Value extends { readonly "~encoded.mutability": "mutable" }
    ? { [P in Key["Encoded"]]?: Value["Encoded"] }
    : { readonly [P in Key["Encoded"]]?: Value["Encoded"] }
  : Value extends { readonly "~encoded.mutability": "mutable" }
    ? { [P in Key["Encoded"]]: Value["Encoded"] }
    : { readonly [P in Key["Encoded"]]: Value["Encoded"] }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3670)

Since v3.10.0

### DecodingServices (type alias)

Union of the decoding service requirements of a record's key schema and value
schema.

**Signature**

```ts
type DecodingServices<Key, Value> = Key["DecodingServices"] | Value["DecodingServices"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3684)

Since v4.0.0

### EncodingServices (type alias)

Union of the encoding service requirements of a record's key schema and value
schema.

**Signature**

```ts
type EncodingServices<Key, Value> = Key["EncodingServices"] | Value["EncodingServices"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3695)

Since v4.0.0

### MakeIn (type alias)

Computes the input object type accepted when constructing a record value.

**Details**

Keys use the key schema's `~type.make` type and values use the value schema's
`~type.make` type. Value optionality and mutability determine whether
properties are optional or writable.

**Signature**

```ts
type MakeIn<Key, Value> = Value extends { readonly "~encoded.optionality": "optional" }
  ? Value extends { readonly "~encoded.mutability": "mutable" }
    ? { [P in Key["~type.make"]]?: Value["~type.make"] }
    : { readonly [P in Key["~type.make"]]?: Value["~type.make"] }
  : Value extends { readonly "~encoded.mutability": "mutable" }
    ? { [P in Key["~type.make"]]: Value["~type.make"] }
    : { readonly [P in Key["~type.make"]]: Value["~type.make"] }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3711)

Since v4.0.0

## Schema (namespace)

Namespace of type-level helpers for `Schema`.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L769)

Since v3.10.0

### Type (type alias)

Extracts the decoded `Type` from a schema.

**Example** (Extracting the decoded type)

```ts
import { Schema } from "effect"

const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })
type Person = Schema.Schema.Type<typeof Person>
// { readonly name: string; readonly age: number }
```

**Signature**

```ts
type Type<S> = S extends { readonly Type: infer T } ? T : never
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L786)

Since v3.10.0

## Struct (namespace)

Namespace for struct field type utilities.

**Details**

These types compute the decoded `Type`, encoded `Encoded`, and constructor
input `MakeIn` of a `Struct` from its field map, handling optional,
mutable, and other field modifiers automatically.

- `Struct.Fields` — constraint for the field map object
- `Struct.Type<F>` — decoded type of the struct
- `Struct.Encoded<F>` — encoded type of the struct
- `Struct.MakeIn<F>` — constructor input (optional/defaulted fields may be omitted)
- `Struct.DecodingServices<F>` / `Struct.EncodingServices<F>` — required services

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3143)

Since v3.10.0

### Fields (type alias)

Constraint for a struct field map: an object whose values are schemas.

**Signature**

```ts
type Fields = { readonly [x: PropertyKey]: Constraint }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3150)

Since v3.10.0

### Type (type alias)

Computes the decoded object type for a struct field map.

**Details**

Field schemas contribute their decoded `Type`. `optionalKey` and `optional`
produce optional properties, while `mutableKey` produces writable properties.

**Signature**

```ts
type Type<F> = View<F, "Type">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3214)

Since v3.10.0

### Iso (type alias)

Computes the iso object type for a struct field map from each field schema's
`Iso` type.

**Details**

The resulting property optionality and mutability follow the same field
modifiers used by `Struct.Type`.

**Signature**

```ts
type Iso<F> = View<F, "Iso">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3228)

Since v4.0.0

### Encoded (type alias)

Computes the encoded object type for a struct field map.

**Details**

Field schemas contribute their `Encoded` type. Encoded-side optionality and
mutability modifiers determine whether properties are optional or writable in
the encoded shape.

**Signature**

```ts
type Encoded<F> = View<F, "Encoded">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3242)

Since v3.10.0

### DecodingServices (type alias)

Union of all decoding service requirements needed by the schemas in a struct
field map.

**Signature**

```ts
type DecodingServices<F> = { readonly [K in keyof F]: F[K]["DecodingServices"] }[keyof F]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3251)

Since v4.0.0

### EncodingServices (type alias)

Union of all encoding service requirements needed by the schemas in a struct
field map.

**Signature**

```ts
type EncodingServices<F> = { readonly [K in keyof F]: F[K]["EncodingServices"] }[keyof F]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3260)

Since v4.0.0

### MakeIn (type alias)

Computes the input object type accepted when constructing a struct value.

**Details**

Required fields use each field schema's `~type.make` input. Fields marked
optional or with a constructor default may be omitted.

**Signature**

```ts
type MakeIn<F> = MakeInView<F>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3285)

Since v4.0.0

## StructWithRest (namespace)

Namespace for `StructWithRest` type utilities.

**Details**

- `StructWithRest.Type<S, R>` — decoded type (struct type intersected with record types)
- `StructWithRest.Encoded<S, R>` — encoded type

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3800)

Since v4.0.0

### Objects (type alias)

Constraint for object-like schemas that can be used as the fixed portion of a
`StructWithRest` schema.

**Signature**

```ts
type Objects = Constraint & { readonly ast: SchemaAST.Objects }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3808)

Since v4.0.0

### Records (type alias)

Readonly list of record schemas that provide the additional index signatures
for a `StructWithRest` schema.

**Signature**

```ts
type Records = ReadonlyArray<$Record<Record.Key, Constraint>>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3817)

Since v3.10.0

### Type (type alias)

Computes the decoded type for `StructWithRest` by intersecting the base object
schema's decoded `Type` with the decoded types of all rest record schemas.

**Signature**

```ts
type Type<S, Records> = Intersect<S, Records, "Type">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3838)

Since v3.10.0

### Iso (type alias)

Computes the iso type for `StructWithRest` by intersecting the base object
schema's `Iso` type with the `Iso` types of all rest record schemas.

**Signature**

```ts
type Iso<S, Records> = Intersect<S, Records, "Iso">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3847)

Since v4.0.0

### Encoded (type alias)

Computes the encoded type for `StructWithRest` by intersecting the base object
schema's encoded type with the encoded types of all rest record schemas.

**Signature**

```ts
type Encoded<S, Records> = Intersect<S, Records, "Encoded">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3856)

Since v3.10.0

### MakeIn (type alias)

Computes the input type accepted when constructing a `StructWithRest` value by
intersecting the base object's make input with the make inputs of all rest
record schemas.

**Signature**

```ts
type MakeIn<S, Records> = Intersect<S, Records, "~type.make">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3866)

Since v4.0.0

### DecodingServices (type alias)

Union of the decoding service requirements of the base object schema and all
rest record schemas.

**Signature**

```ts
type DecodingServices<S, Records> = Services<S, Records, "DecodingServices">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3883)

Since v4.0.0

### EncodingServices (type alias)

Union of the encoding service requirements of the base object schema and all
rest record schemas.

**Signature**

```ts
type EncodingServices<S, Records> = Services<S, Records, "EncodingServices">
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3896)

Since v4.0.0

### ValidateRecords (type alias)

Checks whether fixed fields are compatible with the rest record schemas.

**Details**

Returns `true` when all fixed fields can also satisfy the matching rest
index signatures. Returns a diagnostic object when TypeScript would make
the resulting intersection too narrow for one or more fixed keys.

**Example** (Checking record compatibility)

```ts
import { Schema } from "effect"

const user = Schema.Struct({ id: Schema.String })
const stringExtras = [Schema.Record(Schema.String, Schema.String)] as const

type UserCheck = Schema.StructWithRest.ValidateRecords<typeof user, typeof stringExtras>

const userCheck: UserCheck = true
void userCheck

const counter = Schema.Struct({ count: Schema.NumberFromString })

type CounterCheck = Schema.StructWithRest.ValidateRecords<typeof counter, typeof stringExtras>
//    ^? { "incompatible index signatures": "count" }

const counterCheck = null as unknown as CounterCheck
void counterCheck
```

**Signature**

```ts
type ValidateRecords<S, Records> = [IncompatibleRecords<S, Records>] extends [never]
  ? true
  : {
      "incompatible index signatures": IncompatibleRecords<S, Records>
    }
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L3954)

Since v4.0.0

## TemplateLiteral (namespace)

Namespace for `TemplateLiteral` helper types.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2619)

Since v3.10.0

### SchemaPart (interface)

Constraint for schema parts that can appear inside a `TemplateLiteral`.

**Details**

The schema's encoded value must be a `string`, `number`, or `bigint` so it can
be converted into a template literal string segment.

**Signature**

```ts
export interface SchemaPart extends Constraint {
  readonly Encoded: string | number | bigint
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2631)

Since v4.0.0

### LiteralPart (type alias)

Literal value that can be used directly as a part of a `TemplateLiteral`.

**Signature**

```ts
type LiteralPart = string | number | bigint
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2641)

Since v4.0.0

### Part (type alias)

A single part of a `TemplateLiteral`, either an interpolated schema part or a
literal `string`, `number`, or `bigint`.

**Signature**

```ts
type Part = SchemaPart | LiteralPart
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2650)

Since v4.0.0

### Parts (type alias)

Ordered list of parts used to construct a `TemplateLiteral` schema.

**Signature**

```ts
type Parts = ReadonlyArray<Part>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2658)

Since v4.0.0

### Encoded (type alias)

Computes the encoded string literal type produced by concatenating the encoded
forms of all template literal parts.

**Signature**

```ts
type Encoded<Parts> = Parts extends readonly [...infer Init, infer Last] ? AppendType<Encoded<Init>, Last> : ``
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2674)

Since v3.10.0

## TemplateLiteralParser (namespace)

Namespace for `TemplateLiteralParser` helper types.

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2740)

Since v3.10.0

### Type (type alias)

Computes the decoded tuple type produced by `TemplateLiteralParser`.

**Details**

Literal parts contribute their literal value to the tuple. Schema parts
contribute their decoded `Type`.

**Signature**

```ts
type Type<Parts> = Parts extends readonly [infer Head, ...infer Tail]
  ? readonly [
      Head extends TemplateLiteral.LiteralPart
        ? Head
        : Head extends Codec<infer T, unknown, unknown, unknown>
          ? T
          : never,
      ...Type<Tail>
    ]
  : []
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L2752)

Since v3.10.0

## Tuple (namespace)

Namespace for `Tuple` type utilities.

**Details**

- `Tuple.Elements` — constraint for the element schema array
- `Tuple.Type<E>` — decoded tuple type
- `Tuple.Encoded<E>` — encoded tuple type
- `Tuple.MakeIn<E>` — constructor input tuple

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4039)

Since v3.10.0

### Elements (type alias)

Constraint for the readonly array of element schemas used to define a
fixed-length `Tuple` schema.

**Signature**

```ts
type Elements = ReadonlyArray<Constraint>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4047)

Since v3.10.0

### Type (type alias)

Computes the decoded tuple type for a tuple element schema array.

**Details**

Each element contributes its decoded `Type`; optional element schemas produce
optional tuple positions.

**Signature**

```ts
type Type<E> = Type_<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4070)

Since v3.10.0

### Iso (type alias)

Computes the iso tuple type for a tuple element schema array from each
element schema's `Iso` type.

**Signature**

```ts
type Iso<E> = Iso_<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4089)

Since v4.0.0

### Encoded (type alias)

Computes the encoded tuple type for a tuple element schema array.

**Details**

Each element contributes its `Encoded` type; encoded-side optional element
schemas produce optional tuple positions.

**Signature**

```ts
type Encoded<E> = Encoded_<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4112)

Since v3.10.0

### DecodingServices (type alias)

Union of all decoding service requirements needed by the tuple element
schemas.

**Signature**

```ts
type DecodingServices<E> = E[number]["DecodingServices"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4121)

Since v4.0.0

### EncodingServices (type alias)

Union of all encoding service requirements needed by the tuple element
schemas.

**Signature**

```ts
type EncodingServices<E> = E[number]["EncodingServices"]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4130)

Since v4.0.0

### MakeIn (type alias)

Computes the input tuple type accepted when constructing a tuple value.

**Details**

Each element uses its `~type.make` input type. Optional elements and elements
with constructor defaults produce optional tuple positions.

**Signature**

```ts
type MakeIn<E> = MakeIn_<E>
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4155)

Since v4.0.0

## TupleWithRest (namespace)

Namespace for `TupleWithRest` type utilities.

**Details**

- `TupleWithRest.TupleType` — constraint for the leading tuple schema
- `TupleWithRest.Rest` — the rest element schema(s)
- `TupleWithRest.Type<T, R>` — decoded type (fixed elements + rest)
- `TupleWithRest.Encoded<T, R>` — encoded type

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4252)

Since v4.0.0

### TupleType (type alias)

Constraint for tuple-like schemas that can be used as the fixed leading
portion of a `TupleWithRest` schema.

**Signature**

```ts
type TupleType = Constraint & {
  readonly Type: ReadonlyArray<unknown>
  readonly Encoded: ReadonlyArray<unknown>
  readonly ast: SchemaAST.Arrays
  readonly "~type.make": ReadonlyArray<unknown>
  readonly Iso: ReadonlyArray<unknown>
}
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4260)

Since v3.10.0

### Rest (type alias)

Non-empty list of schemas used for the rest portion of a `TupleWithRest`.

**Details**

The first schema describes the repeated rest element. Additional schemas, when
present, describe trailing tuple elements after the repeated rest segment.

**Signature**

```ts
type Rest = readonly [Constraint, ...Array<Constraint>]
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4279)

Since v3.10.0

### Type (type alias)

Computes the decoded tuple type for a `TupleWithRest`.

**Details**

The output starts with the fixed tuple elements, continues with zero or more
values decoded by the first rest schema, and includes any trailing rest schemas
as fixed tuple positions.

**Signature**

```ts
type Type<T, Rest> = Rest extends readonly [
  infer Head extends Constraint,
  ...infer Tail extends ReadonlyArray<Constraint>
]
  ? Readonly<[...T, ...Array<Head["Type"]>, ...{ readonly [K in keyof Tail]: Tail[K]["Type"] }]>
  : T
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4293)

Since v3.10.0

### Iso (type alias)

Computes the iso tuple type for a `TupleWithRest`.

**Details**

The output starts with the fixed tuple's `Iso` elements, continues with zero
or more values using the first rest schema's `Iso`, and includes any trailing
rest schemas as fixed tuple positions.

**Signature**

```ts
type Iso<T, Rest> = Rest extends readonly [
  infer Head extends Constraint,
  ...infer Tail extends ReadonlyArray<Constraint>
]
  ? Readonly<[...T, ...Array<Head["Iso"]>, ...{ readonly [K in keyof Tail]: Tail[K]["Iso"] }]>
  : T
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4313)

Since v4.0.0

### Encoded (type alias)

Computes the encoded tuple type for `TupleWithRest`.

**Details**

The leading tuple's encoded elements are kept first. The encoded type of the
first rest schema may repeat zero or more times, and the encoded types of any
additional rest schemas become required trailing tuple elements.

**Signature**

```ts
type Encoded<E, Rest> = Rest extends readonly [
  infer Head extends Constraint,
  ...infer Tail extends ReadonlyArray<Constraint>
]
  ? readonly [...E, ...Array<Head["Encoded"]>, ...{ readonly [K in keyof Tail]: Tail[K]["Encoded"] }]
  : E
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4333)

Since v3.10.0

### MakeIn (type alias)

Computes the constructor input tuple type for `TupleWithRest`.

**Details**

The leading tuple's make input elements are kept first. The make input type of
the first rest schema may repeat zero or more times, and the make input types
of any additional rest schemas become required trailing tuple elements.

**Signature**

```ts
type MakeIn<M, Rest> = Rest extends readonly [
  infer Head extends Constraint,
  ...infer Tail extends ReadonlyArray<Constraint>
]
  ? readonly [...M, ...Array<Head["~type.make"]>, ...{ readonly [K in keyof Tail]: Tail[K]["~type.make"] }]
  : M
```

[Source](https://github.com/Effect-TS/effect-smol/tree/main/packages/effect/src/Schema.ts#L4353)

Since v4.0.0
