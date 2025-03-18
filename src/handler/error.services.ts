import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class EmailExist extends HttpException {
    constructor() {
        super("This email is already in use. Please use different mail", HttpStatus.BAD_REQUEST);
    }
}

export class EmailNotExist extends HttpException {
    constructor() {
        super("This email is not registered with us.", HttpStatus.BAD_REQUEST);
    }
}

export class EmailBySocialLogin extends HttpException {
    constructor() {
        super("This email is registered with social login, can't perform this action.", HttpStatus.BAD_REQUEST);
    }
}

export class ProvideEmail extends HttpException {
    constructor() {
        super("Please provide email for every contestent.", HttpStatus.BAD_REQUEST);
    }
}

export class SelectEmail extends HttpException {
    constructor() {
        super("Please Select email for every contestant.", HttpStatus.BAD_REQUEST);
    }
}

export class EmailNotFound extends HttpException {
    constructor() {
        super('Sorry email not found in your social login!.', HttpStatus.BAD_REQUEST);
    }
}

export class PhoneNumberExist extends HttpException {
    constructor() {
        super("Phone Number entered is already registered.", HttpStatus.BAD_REQUEST);
    }
}

export class PhoneNumberNotExist extends HttpException {
    constructor() {
        super('Sorry this Phone number does not exists', HttpStatus.BAD_REQUEST);
    }
}

export class NotBearerToken extends HttpException {
    constructor() {
        super('Sorry this is not a bearer token', HttpStatus.BAD_REQUEST);
    }
}


export class Unauthorized extends HttpException {
    constructor() {
        super('You are not authorized to perform this action.', HttpStatus.UNAUTHORIZED);
    }
}
export class UnauthorizedBadReq extends HttpException {
    constructor() {
        super('You are not authorized to perform this action.', HttpStatus.BAD_REQUEST);
    }
}

export class InsufficientPermission extends HttpException {
    constructor() {
        super('Insufficient permission', HttpStatus.BAD_REQUEST);
    }
}

export class InvalidObjectId extends HttpException {
    constructor() {
        super('Sorry this is not a valid object id.', HttpStatus.BAD_REQUEST);
    }
}

export class IncorrectMessageId extends HttpException {
    constructor() {
        super('Sorry this is not a valid message _id.', HttpStatus.BAD_REQUEST);
    }
}

export class WrongOtp extends HttpException {
    constructor() {
        super('The OTP entered is incorrect! Please enter correct OTP.', HttpStatus.BAD_REQUEST);
    }
}

export class OtpExpired extends HttpException {
    constructor() {
        super('Otp expired. Resend again', HttpStatus.BAD_REQUEST);
    }
}

export class UserNotMatched extends HttpException {
    constructor() {
        super('Sorry users does not matched.', HttpStatus.BAD_REQUEST);
    }
}

export class AdminNotFound extends HttpException {
    constructor() {
        super('Sorry admin not found.', HttpStatus.BAD_REQUEST);
    }
}

export class UserNotFound extends HttpException {
    constructor() {
        super('Sorry user not found.', HttpStatus.BAD_REQUEST);
    }
}

export class NoUserFound extends HttpException {
    constructor() {
        super('Sorry user not found with these credentials.', HttpStatus.BAD_REQUEST);
    }
}

export class EmailAlreadyExist extends HttpException {
    constructor() {
        super('Sorry, this email already exists.', HttpStatus.BAD_REQUEST);
    }
}

export class EmailAlreadyVerified extends HttpException {
    constructor() {
        super('Email already verified.', HttpStatus.BAD_REQUEST);
    }
}

export class PhoneAlreadyVerified extends HttpException {
    constructor() {
        super('Phone already verified.', HttpStatus.BAD_REQUEST);
    }
}

export class EmailNotVerified extends HttpException {
    constructor() {
        super('Email not verified.', HttpStatus.BAD_REQUEST);
    }
}

export class InvitationAlreadyExist extends HttpException {
    constructor() {
        super('Sorry this email already has an invitaion.', HttpStatus.BAD_REQUEST);
    }
}

export class SessionrNotFound extends HttpException {
    constructor() {
        super('Sorry session not found.', HttpStatus.BAD_REQUEST);
    }
}

export class WrongPassword extends HttpException {
    constructor() {
        super("Invalid email or password. Try again", HttpStatus.BAD_REQUEST);
    }
}

export class WrongOldPassword extends HttpException {
    constructor() {
        super("Old Password entered is incorrect! Please enter correct Password.", HttpStatus.BAD_REQUEST);
    }
}

export class PasswordAlreadyUsed extends HttpException {
    constructor() {
        super("This password has been used before. Please choose a new one.", HttpStatus.BAD_REQUEST);
    }
}

export class onlyCreatorCanEdit extends HttpException {
    constructor() {
        super("Only creator can edit the contest.", HttpStatus.BAD_REQUEST);
    }
}

export class YouAreNotCreator extends HttpException {
    constructor() {
        super("Sorry, you are not the creator.", HttpStatus.BAD_REQUEST);
    }
}


export class onlyCreatorCanReview extends HttpException {
    constructor() {
        super("Only creator can review the contestents form.", HttpStatus.BAD_REQUEST);
    }
}

export class AtleastGiveOneFile extends HttpException {
    constructor() {
        super("Select atleast on file for upload.", HttpStatus.BAD_REQUEST);
    }
}

export class ProvidePassword extends HttpException {
    constructor() {
        super("Old Password is mandatory for chaging password.", HttpStatus.BAD_REQUEST);
    }
}

export class OldPasswordIncorrect extends HttpException {
    constructor() {
        super("Old Password is Incorrect!.", HttpStatus.BAD_REQUEST);
    }
}

export class UseDifferentPassword extends HttpException {
    constructor() {
        super("This password is used previously. Please try with new combinations!.", HttpStatus.BAD_REQUEST);
    }
}
export class AccountBlocked extends HttpException {
    constructor() {
        super('Your account is temporarily Blocked. Please contact us via Support.', HttpStatus.BAD_REQUEST);
    }
}

export class AlreadyInvited extends HttpException {
    constructor() {
        super('Sorry you already share this process with this user.', HttpStatus.BAD_REQUEST);
    }
}

export class NotInvitedToProcess extends HttpException {
    constructor() {
        super('Sorry you are not invited by this process organisation.', HttpStatus.BAD_REQUEST);
    }
}

export class AlreadyCreatorOfThisProcess extends HttpException {
    constructor() {
        super('Sorry you already creator of this process.', HttpStatus.BAD_REQUEST);
    }
}

export class AccountDeleted extends HttpException {
    constructor() {
        super('User not found with these credentials.', HttpStatus.BAD_REQUEST);
    }
}

export class DataNotFound extends HttpException {
    constructor() {
        super('Sorry Data Not Found.', HttpStatus.NOT_ACCEPTABLE);
    }
}

export class FaqNotFound extends HttpException {
    constructor() {
        super('Sorry Faq Not Found.', HttpStatus.NOT_ACCEPTABLE);
    }
}

export class CommentNotFound extends HttpException {
    constructor() {
        super('Sorry No Comment Found.', HttpStatus.NOT_FOUND);
    }
}

export class CommentReplyNotFound extends HttpException {
    constructor() {
        super('Sorry No Comment Reply Found.', HttpStatus.NOT_FOUND);
    }
}

export class ReportNotFound extends HttpException {
    constructor() {
        super('Report not found.', HttpStatus.NOT_ACCEPTABLE);
    }
}


export class InvalidParameter extends HttpException {
    constructor() {
        super('Sorry Invalid parameters', HttpStatus.BAD_REQUEST);
    }
}

export class ContestNotFound extends HttpException {
    constructor() {
        super('Contest Details not available.', HttpStatus.BAD_REQUEST);
    }
}

export class RoundIsPending extends HttpException {
    constructor() {
        super('This round is still Pending.', HttpStatus.BAD_REQUEST);
    }
}

export class RoundIsUpcoming extends HttpException {
    constructor() {
        super('This round is still Upcoming.', HttpStatus.BAD_REQUEST);
    }
}

export class RoundNotFound extends HttpException {
    constructor() {
        super('Round details not found.', HttpStatus.BAD_REQUEST);
    }
}

export class RoundIsCompleted extends HttpException {
    constructor() {
        super('This round is already Completed.', HttpStatus.BAD_REQUEST);
    }
}

export class ContestentNotFound extends HttpException {
    constructor() {
        super('Contestent Details are not available.', HttpStatus.BAD_REQUEST);
    }
}


export class OnlyContestentCanReview extends HttpException {
    constructor() {
        super('sorry,You are not a contestent.', HttpStatus.BAD_REQUEST);
    }
}

export class OnlyVoterCanReview extends HttpException {
    constructor() {
        super('sorry, You are not a Voter.', HttpStatus.BAD_REQUEST);
    }
}

export class UserAlreadyExist extends HttpException {
    constructor() {
        super('User already Exist with this email.', HttpStatus.BAD_REQUEST);
    }
}

export class UseNormalLogin extends HttpException {
    constructor() {
        super("This email is used as Normal Login. Please login using Email and Password.", HttpStatus.BAD_REQUEST);
    }
}


export class UserNameAlreadyExist extends HttpException {
    constructor() {
        super("User exists with this Username, Please try with another combination.", HttpStatus.BAD_REQUEST);
    }
}

export class LoginWithSame extends HttpException {
    constructor() {
        super('Please login with this account to send partner request', HttpStatus.BAD_REQUEST);
    }
}


export class AccountTempBlocked extends HttpException {
    constructor() {
        super('Oops! Your account is temporarily Blocked.', HttpStatus.FORBIDDEN);
    }
}

export class InvalidPhoneNumber extends HttpException {
    constructor() {
        super('Invalid Phone Number.', HttpStatus.FORBIDDEN);
    }
}

export class MaxAttemptReached extends HttpException {
    constructor() {
        super('You have reached the maximum number of attempts to enter the OTP. Please try after few Hours..', HttpStatus.FORBIDDEN);
    }
}

export class InvalidOtp extends HttpException {
    constructor() {
        super('OTP entered is incorrect. Please enter correct OTP.', HttpStatus.BAD_REQUEST);
    }
}

export class InvalidEmailOtp extends HttpException {
    constructor() {
        super('Email OTP entered is incorrect. Please enter correct OTP.', HttpStatus.BAD_REQUEST);
    }
}

export class InvalidPhoneOtp extends HttpException {
    constructor() {
        super('Phone OTP entered is incorrect. Please enter correct OTP.', HttpStatus.BAD_REQUEST);
    }
}

export class AccountDeactivated extends HttpException {
    constructor() {
        super('Account Deactivated.', HttpStatus.BAD_REQUEST);
    }
}

export class FeatureNewsNotFound extends HttpException {
    constructor() {
        super('Feature news not found.', HttpStatus.BAD_REQUEST);
    }
}

export class ProvideEmailOrPhoneNumber extends HttpException {
    constructor() {
        super('Please Provide Email or Phone number for forgot password', HttpStatus.BAD_REQUEST);
    }
}

export class ProvidePhoneNumber extends HttpException {
    constructor() {
        super('Please Provide Phone number', HttpStatus.BAD_REQUEST);
    }
}

export class VerifyChangePassword extends HttpException {
    constructor() {
        super('Please Provide Email or Phone number to verify otp', HttpStatus.BAD_REQUEST);
    }
}

export class ChangePasswordOtp extends HttpException {
    constructor() {
        super('Please provide otp for password change', HttpStatus.BAD_REQUEST);
    }
}


export class UseSocialLogin extends HttpException {
    constructor() {
        super('This account is authenticated via a social login. Password reset is not supported!', HttpStatus.BAD_REQUEST);
    }
}

export class RegisterYourself extends HttpException {
    constructor() {
        super('Please Signup before login with this this account.', HttpStatus.BAD_REQUEST);
    }
}


export class SocialTokenMalformed extends HttpException {
    constructor() {
        super('Social Token Malformed.', HttpStatus.BAD_REQUEST);
    }
}

export class ProvideContestentsEmail extends HttpException {
    constructor() {
        super('Please provide email of contestents.', HttpStatus.BAD_REQUEST);
    }
}

export class ProvideContestentsDetails extends HttpException {
    constructor() {
        super('Please provide details of contestents.', HttpStatus.BAD_REQUEST);
    }
}

export class NoReviewFound extends HttpException {
    constructor() {
        super('Sorry No Review found.', HttpStatus.BAD_REQUEST);
    }
}

export class NoReviewCommentFound extends HttpException {
    constructor() {
        super('Sorry Review Comment not found.', HttpStatus.BAD_REQUEST);
    }
}

export class ContentNotFound extends HttpException {
    constructor() {
        super('Sorry, content not found.', HttpStatus.BAD_REQUEST);
    }
}

export class UnSuportedFormate extends HttpException {
    constructor() {
        super('Sorry we currently do not support this format.', HttpStatus.BAD_REQUEST);
    }
}

export class InvalidRequest extends HttpException {
    constructor() {
        super('Invalid Request.', HttpStatus.BAD_REQUEST);
    }
}

export class VeryShortVideo extends HttpException {
    constructor() {
        super('Very short video to process! Try longer and relevent video to its intended purpose.', HttpStatus.BAD_REQUEST);
    }
}

export class SomthingWentWrong extends HttpException {
    constructor() {
        super('Something Went Wrong. Try later', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class AlreadyHaveSubscription extends HttpException {
    constructor() {
        super('You already have subscription.', HttpStatus.BAD_REQUEST);
    }
}

export class DoNotHaveSubscription extends HttpException {
    constructor() {
        super('You do not have any active subscription.', HttpStatus.BAD_REQUEST);
    }
}

export class DepartmentNotFound extends HttpException {
    constructor() {
        super('Department not found.', HttpStatus.BAD_REQUEST);
    }
}
export class MemberNotFound extends HttpException {
    constructor() {
        super('Member not found.', HttpStatus.BAD_REQUEST);
    }
}

export class MemberAlreadyInvited extends HttpException {
    constructor() {
        super('Member with this email already invited.', HttpStatus.BAD_REQUEST);
    }
}

export class OrgNotFound extends HttpException {
    constructor() {
        super('Organisation not found.', HttpStatus.BAD_REQUEST);
    }
}

export class SomthingWentWrongBadReq extends HttpException {
    constructor() {
        super('Something Went Wrong.', HttpStatus.BAD_REQUEST);
    }
}

export class SomthingWentWrongVideo extends HttpException {
    constructor() {
        super('Something went wrong with this video. Try other', HttpStatus.BAD_REQUEST);
    }
}

export class InoughTry extends HttpException {
    constructor() {
        super('Your password has been reset due to too many failed login attempts, New password has been sent to your email.', HttpStatus.BAD_REQUEST);
    }
}

export class DuplicatesDepartments extends HttpException {
    constructor() {
        super('Multiple departments with the same name found.', HttpStatus.BAD_REQUEST);
    }
}

export class ProcessNotFound extends HttpException {
    constructor() {
        super('Process not found.', HttpStatus.BAD_REQUEST);
    }
}

export class CanNotProcessAudio extends HttpException {
    constructor() {
        super(`Can't process this audio try other.`, HttpStatus.BAD_REQUEST);
    }
}

export class ProcessAlreadyInProgress extends HttpException {
    constructor() {
        super(`Process already in progress.`, HttpStatus.BAD_REQUEST);
    }
}

export class CantMakeVideoProcessUsingAudio extends HttpException {
    constructor() {
        super(`Wrong file selection for this request. Using Audio!`, HttpStatus.BAD_REQUEST);
    }
}

export class AlreadyAOwner extends HttpException {
    constructor() {
        super(`Already created an organisation.`, HttpStatus.BAD_REQUEST);
    }
}

export class PlanAlreadyExist extends HttpException {
    constructor() {
        super(`This plan already exist, delete previous one to create new`, HttpStatus.BAD_REQUEST);
    }
}

export class AlreadyMember extends HttpException {
    constructor() {
        super(`Already member of this process.`, HttpStatus.BAD_REQUEST);
    }
}

export class AlreadyOrgMember extends HttpException {
    constructor() {
        super(`Already member of this organisation.`, HttpStatus.BAD_REQUEST);
    }
}
export class NotAOwnerMember extends HttpException {
    constructor() {
        super(`Not owner of this organisation.`, HttpStatus.BAD_REQUEST);
    }
}

export class NotificationNoUserSeleted extends HttpException {
    constructor() {
        super('No User selected.', HttpStatus.BAD_REQUEST);
    }
}

export class NotificationNoOrgSeleted extends HttpException {
    constructor() {
        super('No Organisation selected.', HttpStatus.BAD_REQUEST);
    }
}

export class NotificationNoEmailTemSeleted extends HttpException {
    constructor() {
        super('No email template selected.', HttpStatus.BAD_REQUEST);
    }
}

export class NotificationNoSubjOrCont extends HttpException {
    constructor() {
        super('Subject or content is empty.', HttpStatus.BAD_REQUEST);
    }
}

export class NotificationNoEmailType extends HttpException {
    constructor() {
        super('Email type required.', HttpStatus.BAD_REQUEST);
    }
}